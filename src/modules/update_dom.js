export default function (hours, minutes, seconds, prayer) {
  const timeRemainingDiv = document.querySelector(".time-remaining");
  timeRemainingDiv.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const prayerNameDiv = document.querySelector(".prayer-name");
  prayerNameDiv.textContent = `Remains until ${prayer} azan`;
}
