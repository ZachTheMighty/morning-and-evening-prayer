export default function (prayers) {
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
