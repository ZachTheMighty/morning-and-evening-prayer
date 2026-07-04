import delay from "./delay.js";

export default async function (hours, minutes, seconds, prayer) {
  while (true) {
    if (hours === 0 && minutes === 0 && seconds === 0) timeRemaining();
    seconds--;
    if (seconds === 0 && minutes > 0) {
      minutes--;
      seconds = 59;
    }

    if (minutes === 0 && hours > 0) {
      hours--;
      minutes = 59;
    }

    const timeRemainingDiv = document.querySelector(".time-remaining");
    timeRemainingDiv.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    const prayerNameDiv = document.querySelector(".prayer-name");
    prayerNameDiv.textContent = `Remains until ${prayer} azan`;

    await delay(1);
  }
}
