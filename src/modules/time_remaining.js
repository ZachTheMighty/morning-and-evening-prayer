import displayPrayers from "./display_prayers.js";
import getFivePrayers from "./fetch_prayers.js";
import countdown from "./countdown.js";
import subtractTime from "./subtract_time.js";

export default async function timeRemaining() {
  const currentTime = `${new Date().getHours().toString().padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`;

  let currentDate = new Date()
    .toLocaleString()
    .replaceAll("/", "-")
    .split(",")[0]
    .split("-");
  let temp = currentDate[0];
  currentDate[0] = currentDate[1];
  currentDate[1] = temp;

  let upcomingPrayer;

  let fivePrayers = Object.entries(await getFivePrayers(currentDate.join("-")));

  for (const prayer of fivePrayers) {
    if (prayer[1] > currentTime) {
      upcomingPrayer = {
        prayer: prayer[0],
        time: prayer[1],
      };
      break;
    }
  }
  displayPrayers(fivePrayers, upcomingPrayer);

  let timeRemaining;

  if (fivePrayers.length === 0) {
    fivePrayers = {
      prayer: "Fajr",
      time: Object.values(await getFivePrayers(currentDate.join("-")))[0],
    };

    timeRemaining = subtractTime(
      fivePrayers.time.toString(),
      `${new Date().getHours()}:${new Date().getMinutes()}: ${new Date().getSeconds()}`,
      fivePrayers.prayer,
    );
    timeRemaining.prayer = fivePrayers.prayer;
  } else {
    if (upcomingPrayer.time > currentTime)
      timeRemaining = subtractTime(
        upcomingPrayer.time,
        `${new Date().getHours()}:${new Date().getMinutes()}: ${new Date().getSeconds()}`,
        upcomingPrayer.prayer,
      );
    timeRemaining.prayer = fivePrayers.prayer;
  }

  countdown(
    timeRemaining.hours,
    timeRemaining.minutes,
    timeRemaining.seconds,
    timeRemaining.prayer,
  );
}
