import delay from "./delay.js";
import updateDOM from "./update_dom.js";
import timeRemaining from "./time_remaining.js";

export default async function (hours, minutes, seconds, prayer) {
  while (true) {
    if (hours === 0 && minutes === 0 && seconds === 0) timeRemaining();

    seconds--;
    if (seconds < 0) seconds = 59;

    if (seconds === 59 && minutes > 0) {
      minutes--;
      if (minutes < 0) minutes = 59;
    }

    if (minutes === 0 && hours > 0) hours--;

    updateDOM(hours, minutes, seconds, prayer);
    await delay(1);
  }
}
