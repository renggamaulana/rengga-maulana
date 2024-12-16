export default function convertTimestampToDate(data: any) {
    for (const key in data) {
      if (
        data[key] &&
        typeof data[key] === "object" &&
        "seconds" in data[key] &&
        "nanoseconds" in data[key]
      ) {
        data[key] = new Date(data[key].seconds * 1000 + data[key].nanoseconds / 1e6);
      }
    }
    return data;
  }
