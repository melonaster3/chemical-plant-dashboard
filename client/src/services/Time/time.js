export function timestampToReadableDate(timestamp) {
  // Convert the timestamp (in ISO 8601 format) to a Date object
  const date = new Date(timestamp);

  // Define options for formatting the date
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  };

  // Format the date and return it as a readable string
  return date.toLocaleDateString(undefined, options);
}
export function getAverage(data, frame) {
  if (!data || data.length === 0) {
    return []; // Return an empty array if the data is empty or undefined.
  }
  data = data.map((entry) => ({
    ...entry,
    temperature: parseFloat(entry.temperature),
    pressure: parseFloat(entry.pressure),
    level1_chemical: parseFloat(entry.level1_chemical),
    level2_chemical: parseFloat(entry.level2_chemical),
    timestamp: new Date(entry.timestamp),
  }));
  // Calculate the time frame (in milliseconds) based on the user's selection.
  let timeFrame;
  let labelFormat = "MM/DD/YYYY h:mma";
  const localeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  switch (frame) {
    case "Daily":
      timeFrame = 24 * 60 * 60 * 1000; // 1 day
      labelFormat = "MM/DD/YYYY"; // Show only the date for daily
      break;
    case "Weekly":
      timeFrame = 7 * 24 * 60 * 60 * 1000; // 7 days
      break;
      case "Monthly":
        // Create an array to hold the aggregated monthly data
        let monthlyData = [];
        let currentMonth = new Date(data[0].timestamp).getMonth();
        let currentYear = new Date(data[0].timestamp).getFullYear();
        let monthEntries = [];
      
        for (let entry of data) {
          const entryMonth = new Date(entry.timestamp).getMonth();
          const entryYear = new Date(entry.timestamp).getFullYear();
      
          if (entryYear > currentYear || (entryYear === currentYear && entryMonth > currentMonth)) {
            // Data is in a new month, calculate the average for the current month
            if (monthEntries.length > 0) {
              const averageEntry = calculateAverageForMonth(monthEntries, currentMonth, currentYear);
              monthlyData.push(averageEntry);
            }
      
            // Reset the current month and year
            currentMonth = entryMonth;
            currentYear = entryYear;
            monthEntries = [entry];
          } else {
            // Data is within the current month, add it to the monthEntries array
            monthEntries.push(entry);
          }
        }
      
        // Calculate the average for the last month
        if (monthEntries.length > 0) {
          const averageEntry = calculateAverageForMonth(monthEntries, currentMonth, currentYear);
          monthlyData.push(averageEntry);
        }
      
        return monthlyData;
      break;
      
  
    case "Hourly":
      timeFrame = 60 * 60 * 1000; // 1 hour
      break;
    default:
      throw new Error("Invalid time frame");
  }

  // Convert the timestamp strings to Date objects.


  // Initialize variables for the aggregation process.
  let currentFrameStart = data[0].timestamp.getTime();
  currentFrameStart = Math.floor(currentFrameStart / timeFrame) * timeFrame; // Set the start to the nearest boundary.
  let frameData = [];
  let aggregatedData = [];

  // Iterate through the data to calculate averages.
  for (let entry of data) {
    if (entry.timestamp.getTime() - currentFrameStart <= timeFrame) {
      // Data within the current frame; add it to the frameData array.
      frameData.push(entry);
    } else {
      // Data outside the current frame; calculate the average and push it to aggregatedData.
      if (frameData.length > 0) {
        const frameTimestamp = new Date(currentFrameStart + timeFrame / 2); // Use the midpoint of the frame as the timestamp.
        const averageEntry = { timestamp: frameTimestamp };

        // Calculate the date range label.
        const startDate = frameData[0].timestamp;
        const endDate = frameData[frameData.length - 1].timestamp;
        const localeOptionsDay = { year: 'numeric', month: '2-digit', day: '2-digit', };
        const localeOptionsHourly = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

        if(frame === "Hourly") {
          averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsHourly) + " ~ " + endDate.toLocaleDateString(undefined, localeOptionsHourly);
    
        } else if (frame === "Daily") {
          averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsDay) 
    
        } else {
          averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsDay) + " ~ " + endDate.toLocaleDateString(undefined, localeOptionsDay);
    
        }
    


        // Calculate the average for each parameter.
        for (let param of Object.keys(frameData[0])) {
          if (param !== "timestamp") {
            const total = frameData.reduce((acc, dataEntry) => acc + dataEntry[param], 0);
            averageEntry[param] = total / frameData.length;
          }
        }

        aggregatedData.push(averageEntry);
      }

      // Move to the next time frame.
      currentFrameStart += timeFrame;
      frameData = [entry];
    }
  }

  // Ensure the last frame is processed.
  if (frameData.length > 0) {
    const frameTimestamp = new Date(currentFrameStart + timeFrame / 2);
    const averageEntry = { timestamp: frameTimestamp };

    // Calculate the date range label.
    const startDate = frameData[0].timestamp;
    const endDate = frameData[frameData.length - 1].timestamp;
    const localeOptionsDay = { year: 'numeric', month: '2-digit', day: '2-digit', };
    const localeOptionsHourly = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    if(frame === "Hourly") {
      averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsHourly) + " ~ " + endDate.toLocaleDateString(undefined, localeOptionsHourly);

    } else if (frame === "Daily") {
      averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsDay) 

    } else {
      averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsDay) + " ~ " + endDate.toLocaleDateString(undefined, localeOptionsDay);

    }


    for (let param of Object.keys(frameData[0])) {
      if (param !== "timestamp") {
        const total = frameData.reduce((acc, dataEntry) => acc + dataEntry[param], 0);
        averageEntry[param] = total / frameData.length;
      }
    }

    aggregatedData.push(averageEntry);
  }

  return aggregatedData;
}
function calculateAverageForMonth(entries, month, year) {
  const averageEntry = { timestamp: new Date(year, month, 1) }; // Use the first day of the month as the timestamp

  // Calculate the average for each parameter
  for (let param of Object.keys(entries[0])) {
    if (param !== "timestamp") {
      const total = entries.reduce((acc, dataEntry) => acc + dataEntry[param], 0);
      averageEntry[param] = total / entries.length;
    }
  }

  // Generate a custom label based on your requirements
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  averageEntry.label = `${monthNames[month]} ${year}`;

  return averageEntry;
}