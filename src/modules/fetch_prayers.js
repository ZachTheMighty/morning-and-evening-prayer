export default async function (date) {
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
