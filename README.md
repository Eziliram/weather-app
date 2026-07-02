# Weather app

> By Marilize Franken

A React + TypeScript weather application showcasing production-oriented frontend architecture, caching strategies, testing, and handling of third-party API limitations.

# Requirements

- Node.js 20+ (LTS)
- npm (or use yarn/pnpm if you prefer)

# Setup

- Clone the repository:
  - `git clone https://github.com/Eziliram/weather-app.git`
  - `cd weather-app`

- Copy the example environment file: `cp .env.example .env`

  > The repository includes a WeatherStack API key for the purposes of this assessment so the application can be run immediately. In a production environment, API keys would be managed using environment variables and a secure secrets management solution.

# Running the application

- Install dependencies: `npm install`
- Run the dev server (Vite): `npm run dev`

# Running tests

- Run tests (Vitest + RTL): `npm run test`

The following areas were focused on:

- Overview > main page flow
- WeatherDetailCard > core UI weather display
- WeatherGrid > weather grid rendering for forecast and history
- WeatherTile > weather tile presentation
- useWeather > data loading behaviour
- weatherService > business logic around fetching data
- weatherCache > caching logic
- formatter > formatting logic

# Architecture

The goal of this project was to deliver a solution that is simple, maintainable, testable, and easy to extend.

- React + TypeScript
- Vite
- Chakra UI
- Vitest + React Testing Library
- LocalStorage caching
- Provider abstraction layer for weather data

# Features

- current weather display
- location selector
- weather details view
- forecast preview (mocked)
- historical preview (mocked)
- interactive weather selection
- localStorage caching
- manual refresh
- responsive UI
- unit formatting utilities
- test coverage for core application behaviour

# Design decisions

- Native Fetch API as per requirements
- Chakra UI to align with company component library
- LocalStorage for caching weather data

### LocalStorage caching strategy

#### Problem

- WeatherStack imposes monthly API call limits on both the free and paid tiers.

Because WeatherStack imposes monthly API limits, reducing unnecessary requests becomes important even for relatively small applications.

Weather data changes less frequently than many real-time data sources, making it a good candidate for client-side caching.

The application therefore uses localStorage to:

- display cached weather data immediately on page load
- reduce API consumption
- improve perceived application performance
- allow manual refreshes when the user wants the latest data

#### Summary

On page load, if the cached weather data is older than 1 hour, fresh data will be fetched and displayed, and the cache will be updated.

The user also has the option to refresh the current weather data by clicking the Refresh button. A future enhancement could be to throttle refreshes over time.

This way, API calls made to Weatherstack stay low, while the user still has the flexibility to see up-to-date weather data.

# Trade-offs

### Weatherstack

Weatherstack's free tier only provides _current_ weather.

The free tier does NOT support:

- Forecasting
- Historical weather data

Given the limitations of the WeatherStack free tier, I chose to prioritise:

- application architecture
- user experience
- maintainability
- future extensibility

To show the intended user experience and interaction flow, forecast and historical weather data are showcased using mock data.

# Future improvements

Potential enhancements include:

- Search-based location lookup
- Refresh throttling
- Skeleton loading states
- Weather animations
- End-to-end testing with Playwright
