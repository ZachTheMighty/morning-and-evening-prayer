async function getFivePrayers(date) {
  let result;
  await fetch(
    `https://api.aladhan.com/v1/timingsByCity/${date}?country=jordan&city=amman`,
  )
    .then((response) => response.json())
    .then((data) => (result = data.data.timings));
  const { Fajr, Dhuhr, Asr, Maghrib, Isha } = result;
  return { Fajr, Dhuhr, Asr, Maghrib, Isha };
}

async function timeRemaining() {
  const currentTime = `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`;

  let string = new Date()
    .toLocaleString()
    .replaceAll("/", "-")
    .split(",")[0]
    .split("-");
  let temp = string[0];
  string[0] = string[1];
  string[1] = temp;

  let upcomingPrayer;

  let fivePrayers = Object.entries(await getFivePrayers(string.join("-")));

  for (const prayer of fivePrayers) {
    if (prayer[1] > currentTime) {
      upcomingPrayer = {
        prayer: prayer[0],
        time: prayer[1],
      };
      break;
    }
  }

  if (fivePrayers.length === 0) {
    fivePrayers = {
      prayer: "Fajr",
      time: Object.values(await getFivePrayers(string.join("-")))[0],
    };

    subtractTime(
      fivePrayers.time.toString(),
      `${new Date().getHours()}:${new Date().getMinutes()}: ${new Date().getSeconds()}`,
      fivePrayers.prayer,
    );
  } else {
    if (upcomingPrayer.time > currentTime)
      subtractTime(
        upcomingPrayer.time,
        `${new Date().getHours()}:${new Date().getMinutes()}: ${new Date().getSeconds()}`,
        upcomingPrayer.prayer,
      );
  }
}

async function subtractTime(timeA, timeB, prayer) {
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

  while (hours !== 0 || minutes !== 0 || seconds !== 0) {
    await delay();
    seconds--;
    if (seconds === 0) {
      minutes--;
      seconds = 59;
    }

    if (minutes === 0) {
      hours--;
      minutes = 59;
    }

    const timeRemainingDiv = document.querySelector(".time-remaining");
    timeRemainingDiv.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    const prayerNameDiv = document.querySelector(".prayer-name");
    prayerNameDiv.textContent = `Remains until ${prayer} azan`;
  }
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

timeRemaining();
