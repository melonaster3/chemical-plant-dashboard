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