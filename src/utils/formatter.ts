export const formatDate = (value: Date, format = "long") => {
    return new Intl.DateTimeFormat("en-GB", {
    weekday: format === "long" ? "long" : "short",
    day: "2-digit",
    month: format === "long" ? "long" : "short",
  }).format(value);
} 

export const formatTime = (value: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(value)
    .toUpperCase();
}

export const formatTemperature = (value: number, isMetric: boolean) =>
    `${value}${isMetric ? "°C" : "°F"}`;

  export const formatSpeed = (value: number, isMetric: boolean) =>
    `${value} ${isMetric ? "km/h" : "mph"}`;

  export const formatDistance = (value: number, isMetric: boolean) =>
    `${value} ${isMetric ? "km" : "miles"}`;