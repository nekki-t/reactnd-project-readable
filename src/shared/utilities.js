class Utilities {
  static getFormattedDateTime (timestamp){
    const options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-us", options);
  }
}

export default Utilities;