export default function (timeA, timeB) {
  const a = timeA.split(":");
  const b = timeB.split(":");

  let hours = a[0] - b[0];
  let minutes = a[1] - b[1] - 1;
  let seconds = Math.abs(b[2] - 60);

  if (minutes < 0) {
    hours--;
    minutes = 60 - Math.abs(minutes);
  }

  if (hours < 0) {
    hours = 24 - Math.abs(hours);
  }

  return { hours, minutes, seconds };
}
