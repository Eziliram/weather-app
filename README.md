### A simple weather app

> By Marilize Franken

# How to run

Requirements:

- Node.js 20+ (LTS)
- npm (or use yarn/pnpm if you prefer)

## Commands

- Install dependencies: `npm install`
- Run the dev server (Vite): `npm run dev`
- Build the app: `npm run build`
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

So, if many users start using the app, that API call limit would be reached fairly quickly.

Compared to other real-time apps, weather data changes relatively slowly.

To keep the number of calls to Weatherstack to a minimum, the app uses localStorage to show cached weather data on page load and only fetches fresh data when it makes sense to do so.

#### Summary

On page load, if the cached weather data is older than 24 hours, fresh data will be fetched and displayed, and the cache will be updated.

The user also has the option to refresh the current weather data by clicking the Refresh button. A future enhancement could be to throttle refreshes over time.

This way, API calls made to Weatherstack stay low, while the user still has the flexibility to see up-to-date weather data.

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

# Project architecture

fetch API < weatherApi < weatherCache < weatherService < useWeather hook < UI

# Test coverage

The following areas were focused on:

- Overview > main page flow
- CurrentWeatherCard > core UI weather display
- WeatherGrid > weather grid rendering for forecast and history
- WeatherTile > weather tile presentation
- useWeather > data loading behaviour
- weatherService > business logic around fetching data
- weatherCache > caching logic
- formatter > formatting logic
