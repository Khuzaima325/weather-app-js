# Weather App (JavaScript)

A simple weather app in vanilla HTML, CSS and JavaScript. Type a city name and
see the current temperature, conditions, humidity, wind and today's high/low.

## Features

- City search with the free Open-Meteo geocoding API
- Current weather + daily high/low from the Open-Meteo forecast API
- **No API key needed** — Open-Meteo is free for non-commercial use
- Works entirely in the browser, no build step

## How to run

Just open `index.html` in your browser (or serve the folder with any static
server, e.g. `npx serve` or `python3 -m http.server`).

## How it works

1. `app.js` looks up the city via `geocoding-api.open-meteo.com`
2. It fetches current weather from `api.open-meteo.com/v1/forecast`
3. WMO weather codes are mapped to human-readable conditions

Built by @khuzaima.tech
