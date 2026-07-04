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

  let nextDay = false;
  for (const prayer of fivePrayers) {
    if (prayer[1] > currentTime) {
      upcomingPrayer = {
        prayer: prayer[0],
        time: prayer[1],
      };
      break;
    }
  }
  if (!upcomingPrayer) nextDay = true;

  displayPrayers(fivePrayers, upcomingPrayer, nextDay);

  let timeRemaining;

  const fullCurrentTime = `${new Date().getHours()}:${new Date().getMinutes()}: ${new Date().getSeconds()}`;
  if (nextDay) {
    fivePrayers = {
      prayer: "Fajr",
      time: Object.values(
        await getFivePrayers(currentDate.join("-")),
      )[0].toString(),
    };

    timeRemaining = subtractTime(fivePrayers.time, fullCurrentTime, nextDay);
    timeRemaining.prayer = fivePrayers.prayer;
  } else {
    timeRemaining = subtractTime(upcomingPrayer.time, fullCurrentTime, nextDay);
    timeRemaining.prayer = upcomingPrayer.prayer;
  }

  countdown(
    timeRemaining.hours,
    timeRemaining.minutes,
    timeRemaining.seconds,
    timeRemaining.prayer,
  );
}
