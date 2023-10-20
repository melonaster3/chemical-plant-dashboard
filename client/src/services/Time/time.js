import { DateTime } from "luxon";

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
  // Check if the data is empty or undefined
  if (!data || data.length === 0) {
    return []; // Return an empty array if the data is empty or undefined.
  }

  // Check if 'frame' is not provided; apply default data processing
  if (!frame) {
    data = data.map((entry) => ({
      ...entry,
      temperature: parseFloat(entry.temperature),
      pressure: parseFloat(entry.pressure),
      level1_chemical: parseFloat(entry.level1_chemical),
      level2_chemical: parseFloat(entry.level2_chemical),
      isoTimeStamp: entry.timestamp,
      timestamp: new Date(entry.timestamp),
    }));
    return data;
  }

  // Data processing for various time frames
  data = data.map((entry) => ({
    ...entry,
    temperature: parseFloat(entry.temperature),
    pressure: parseFloat(entry.pressure),
    level1_chemical: parseFloat(entry.level1_chemical),
    level2_chemical: parseFloat(entry.level2_chemical),
    isoTimeStamp: entry.timestamp,
    timestamp: new Date(entry.timestamp),
  }));

  let timeFrame;
  let labelFormat = "MM/DD/YYYY h:mma";

  switch (frame) {
    case "Daily":
      // Set time frame to one day and label format to date-only
      timeFrame = 24 * 60 * 60 * 1000;
      labelFormat = "MM/DD/YYYY";
      break;
    case "Weekly":
      // Set time frame to one week
      timeFrame = 7 * 24 * 60 * 60 * 1000;
      break;
    case "Monthly":
      // Process data on a monthly basis
      let monthlyData = [];
      let currentMonth = new Date(data[0].timestamp).getMonth();
      let currentYear = new Date(data[0].timestamp).getFullYear();
      let monthEntries = [];

      for (let entry of data) {
        const entryMonth = new Date(entry.timestamp).getMonth();
        const entryYear = new Date(entry.timestamp).getFullYear();

        if (entryYear > currentYear || (entryYear === currentYear && entryMonth > currentMonth)) {
          // Data is in a new month; calculate the average for the current month
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

    case "Hourly":
      // Set time frame to one hour
      timeFrame = 60 * 60 * 1000;
      break;
    default:
      throw new Error("Invalid time frame");
  }

  // Data aggregation based on the specified time frame
  // Initialize variables for the aggregation process.
  let currentFrameStart = data[0].timestamp.getTime();
  let frameData = [];
  let aggregatedData = [];

  if (frame === "Daily" || frame === "Week" || frame === "Monthly") {
    // Adjust the start time to the beginning of the day if needed
    const startDate = new Date(currentFrameStart);
    startDate.setHours(0, 0, 0, 0); // Set the time to midnight (start of the day)
    currentFrameStart = startDate.getTime(); // Get the timestamp for the start of the day
  }

  currentFrameStart = Math.floor(currentFrameStart / timeFrame) * timeFrame; // Set the start to the nearest time frame boundary.

  // Iterate through the data to calculate averages.
  for (let entry of data) {
    if (entry.timestamp.getTime() - currentFrameStart <= timeFrame) {
      // Data is within the current frame; add it to the frameData array.
      frameData.push(entry);
    } else {
      // Data is outside the current frame; calculate the average and push it to aggregatedData.
      if (frameData.length > 0) {
        const frameTimestamp = new Date(currentFrameStart + timeFrame / 2); // Use the midpoint of the frame as the timestamp.
        const averageEntry = { timestamp: frameTimestamp };

        // Set isoTimeStamp to the timestamp of the START of the frame in ISO format.
        averageEntry.isoTimeStamp = new Date(currentFrameStart).toISOString();

        // Calculate the date range label.
        const startDateDate = frameData[0].timestamp;
        let startDate = new Date(startDateDate).setMinutes(0);
        startDate = new Date(startDate);

        let endDate = frameData[frameData.length - 1].timestamp;
        const localeOptionsDay = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const localeOptionsHourly = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

        if (frame === "Hourly") {
          averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsHourly);
        } else if (frame === "Daily") {
          averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsDay);
        } else {
          averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsDay) + " ~ " + endDate.toLocaleDateString(undefined, localeOptionsDay);
        }

        // Calculate the average for each parameter without changing the numeric values.
        for (let param of Object.keys(frameData[0])) {
          if (param !== "timestamp" && param !== "isoTimeStamp") {
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
    const startDateDate = frameData[0].timestamp;
    let startDate = new Date(startDateDate).setMinutes(0);
    startDate = new Date(startDate);

    const endDate = frameData[frameData.length - 1].timestamp;
    const localeOptionsDay = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const localeOptionsHourly = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

    if (frame === "Hourly") {
      averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsHourly);
    } else if (frame === "Daily") {
      averageEntry.label = startDate.toLocaleDateString(undefined, localeOptionsDay);
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
// Function to calculate the average for a given month
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

// Function to get the current time in a specified time zone
export function GetTimeRightNow() {
  const timeZone = "Asia/Seoul"; // Replace with desired time zone
  const currentTime = DateTime.now().setZone(timeZone).toISO();
  const timeRightNow = currentTime.slice(0, 16);
  return timeRightNow
}


// Function to get the time one hour before a given timestamp in a specified time zone
export function GetTimeOneHourBefore(timestamp) {
  const timeZone = 'Asia/Seoul'; // Replace with desired time zone
  const currentTime = DateTime.fromISO(timestamp).setZone(timeZone);
  const timeOneHourBefore = currentTime.minus({ hours: 1 }).toISO();
  return timeOneHourBefore.slice(0, 16);
}


// Function to get the time one day before a given timestamp in a specified time zone
export function GetTimeOneDayBefore(timestamp) {
  const timeZone = 'Asia/Seoul'; // Replace with desired time zone
  const currentTime = DateTime.fromISO(timestamp).setZone(timeZone);
    // Similar to GetTimeOneHourBefore, but subtracts 24 hours
  const timeOneHourBefore = currentTime.minus({ hours: 24 }).toISO();
  return timeOneHourBefore.slice(0, 16);
}


// Function to get the time one week before a given timestamp in a specified time zone
export function GetTimeOneWeekBefore(timestamp) {
  const timeZone = 'Asia/Seoul'; // Replace with desired time zone
  const currentTime = DateTime.fromISO(timestamp).setZone(timeZone);
    // Calculate the time one week before the given timestamp and format it
  let oneWeekBefore = currentTime.minus({ weeks: 1 }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISO();
oneWeekBefore=oneWeekBefore.slice(0,16) 
  return oneWeekBefore;
}


// Function to get the time one month before the current time in a specified time zone
export function GetTimeOneMonthBefore() {
  const timeZone = 'Asia/Seoul'; // Replace with desired time zone
  const currentTime = DateTime.now().setZone(timeZone);
    // Calculate the time one month before the current time and format it
  let oneMonthBefore = currentTime.set({ day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 }).toISO();
  oneMonthBefore=oneMonthBefore.slice(0,16) 

  return oneMonthBefore;
}