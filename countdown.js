async function getFivePrayers(date) {
  if (localStorage.getItem(date)) return JSON.parse(localStorage.getItem(date));

  let result;
  await fetch(
    `https://api.aladhan.com/v1/timingsByCity/${date}?country=jordan&city=amman`,
  )
    .then((response) => response.json())
    .then((data) => (result = data.data.timings));
  const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = result;
  localStorage.setItem(
    date,
    JSON.stringify({
      Fajr,
      Dhuhr,
      Asr,
      Maghrib,
      Isha,
    }),
  );
  return { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha };
}

async function timeRemaining() {
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
  displayPrayers(fivePrayers);

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
      time: Object.values(await getFivePrayers(currentDate.join("-")))[0],
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
    await delay();
  }
}

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}
function displayPrayers(prayers) {
  const prayersDiv = document.createElement("div");
  prayersDiv.classList.add("prayers");

  prayers.forEach((prayer) => {
    const prayerDiv = document.createElement("div");
    prayerDiv.classList.add(prayer[0]);

    const prayerName = document.createElement("div");
    prayerName.classList.add("name");
    prayerName.textContent = prayer[0];

    const prayerTime = document.createElement("div");
    prayerTime.classList.add("time");
    prayerTime.textContent = prayer[1];

    prayerDiv.append(prayerName, prayerTime);

    prayersDiv.append(prayerDiv);
  });

  document.body.append(prayersDiv);
}

timeRemaining();
