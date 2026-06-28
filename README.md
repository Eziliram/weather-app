### A simple weather app

> By Marilize Franken

# How to run

Requirements:

- Node.js 16+ (LTS)
- npm (or use yarn/pnpm if you prefer)

## Commands

- Install dependencies: `npm install`
- Run dev server (Vite): `npm run dev`
- Run tests (Vitest + RTL): `npm run test`

# Architecture

My goal is to keep it simple, functional and clean. I want to build a solution that is easy to scale, maintain and test.

## React + TypeScript + Vite

## Vitest + React Testing Library (RTL)

## Chakra UI

## Weather provider

- WeatherStack

# Design decisions and trade-offs

## Limitations

### WeatherStack

WeatherStack's free tier only provides _current_ weather.

It does NOT support:

- Forecasting
- Historical weather data

Instead of introducing mocked or simulated data, I chose to:

- Prioritise app architecture and user experience over unsupported features
- Implement a provider abstraction layer for future API expansion
