### A simple weather app

> By Marilize Franken

# How to run

Requirements:

- Node.js 20+ (LTS)
- npm (or use yarn/pnpm if you prefer)

## Commands

- Install dependencies: `npm install`
- Run dev server (Vite): `npm run dev`
- Run tests (Vitest + RTL): `npm run test`

# Architecture

My goal is to keep it simple, functional and clean. I want to build a solution that is easy to scale, maintain and test.

- React + TypeScript + Vite
- Vitest + React Testing Library (RTL)
- Chakra UI
- LocalStorage
- Weather provider
  - Weatherstack

# Design decisions

- Native Fetch API as per requirements
- Chakra UI to align with company component library
- LocalStorage for caching weather data

### LocalStorage

Limitation

- Weatherstack has a limitation on the amount of API calls that can be made per month on the free tier.
- Upgraded tiers also have limitations on the amount of API calls that can be made per month.

So, if many users start using the app, this API call limit will be reached fairly quickly...

Compared to other real time apps, weather data changes relatively slowly.

Therefore, to keep the number of calls made to Weatherstack to a minimal, and to keep the app simple, the app makes use of local storage to display cached weather data on page load, and only fetches new data when it is intended.

#### Summary

On page load, if the weather data is older than (x) minutes or (x) days, fresh data will be fetched and displayed, and the cache will be updated.

The user also has the option to refresh the current weather data by clicking on a Refresh button. (Future enhancement: We can take it a step further to also throttle the number of refreshes allowed in a certain timeframe.)

This way, API calls made to Weatherstack will be kept to a minimum, while the user still has the flexibility to see up-to-date weather data.

# Trade-offs

### Weatherstack

Weatherstack's free tier only provides _current_ weather.

The free tier does NOT support:

- Forecasting
- Historical weather data

Since forecast and historical weather data is not available, I chose to:

- Prioritise app architecture and user experience over unsupported features
- Implement a provider abstraction layer for future API expansion
- Use mock data for forecast and historical weather data for display purposes only

# Project structure

- src
  - App.tsx
  - main.tsx
  - pages
    - Overview.tsx
  - components
    - weather
      - CurrentWeatherCard.tsx
      - WeatherGrid.tsx
      - WeatherTile.tsx

fetch API < weatherApi < weatherCache < weatherService < useWeather hook < UI
