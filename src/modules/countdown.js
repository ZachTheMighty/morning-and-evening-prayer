import delay from "./delay.js";
import updateDOM from "./update_dom.js";

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
    updateDOM(hours, minutes, seconds, prayer);
    await delay(1);
  }
}
