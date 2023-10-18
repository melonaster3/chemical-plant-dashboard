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

  // Parse the timestamp strings into Date objects for easier date manipulation.
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
  switch (frame) {
    case "Daily":
      timeFrame = 24 * 60 * 60 * 1000; // 1 day
      break;
    case "Weekly":
      timeFrame = 7 * 24 * 60 * 60 * 1000; // 7 days
      break;
    case "Monthly":
      // This is a simplified calculation for an "average" month. You may need more accurate calculations based on the specific month.
      timeFrame = 30 * 24 * 60 * 60 * 1000; // 30 days (approximate)
      break;
    case "Hourly":
      timeFrame = 60 * 60 * 1000; // 1 hour
      break;
    default:
      throw new Error("Invalid time frame");
  }

  // Initialize variables for the aggregation process.
  let currentFrameStart = data[0].timestamp.getTime();
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