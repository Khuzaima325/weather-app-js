// Weather app powered by the free Open-Meteo API (no API key required).
// Docs: https://open-meteo.com/

const WEATHER_CODES = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing rime fog",
  51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle",
  61: "Slight rain", 63: "Rain", 65: "Heavy rain",
  71: "Slight snow", 73: "Snow", 75: "Heavy snow",
  80: "Slight rain showers", 81: "Rain showers", 82: "Violent rain showers",
  95: "Thunderstorm", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail",
};

const form = document.getElementById("search-form");
const input = document.getElementById("city-input");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = input.value.trim();
  if (!city) return;
  statusEl.textContent = "Loading…";
  resultEl.hidden = true;
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    const geo = await geoRes.json();
    if (!geo.results || geo.results.length === 0) {
      throw new Error("City not found. Try another name.");
    }
    const place = geo.results[0];
    const wxRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10kmh` +
      `&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const wx = await wxRes.json();
    const current = wx.current;

    document.getElementById("place-name").textContent =
      `${place.name}${place.country ? ", " + place.country : ""}`;
    document.getElementById("temp").textContent = Math.round(current.temperature_2m);
    document.getElementById("condition").textContent =
      WEATHER_CODES[current.weather_code] || "Unknown conditions";
    document.getElementById("humidity").textContent = current.relative_humidity_2m;
    document.getElementById("wind").textContent = current.wind_speed_10kmh;
    document.getElementById("high").textContent = Math.round(wx.daily.temperature_2m_max[0]);
    document.getElementById("low").textContent = Math.round(wx.daily.temperature_2m_min[0]);

    statusEl.textContent = "";
    resultEl.hidden = false;
  } catch (err) {
    statusEl.textContent = err.message || "Something went wrong. Check your connection.";
  }
});
