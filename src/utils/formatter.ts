export const formatDate = (value: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
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