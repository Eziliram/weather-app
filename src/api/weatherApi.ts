import http from "./http";

const WEATHERSTACK_BASE_URL = `https://api.weatherstack.com`;
const WEATHERSTACK_API_KEY =
  import.meta.env.VITE_WEATHERSTACK_API_KEY;

if (!WEATHERSTACK_API_KEY) {
  throw new Error(
    "Missing VITE_WEATHERSTACK_API_KEY",
  );
}

/**
 * WeatherStack free tier limitations:
 *
 * - current weather supported
 * - forecast/history unavailable
 *
 * Forecast and history endpoints are implemented
 * to preserve the API contract and are mocked
 * during development/demo mode.
 */
const weatherApi = {
    getCurrent: (city: string) => http(`${WEATHERSTACK_BASE_URL}/current?access_key=${WEATHERSTACK_API_KEY}&query=${city}`),
    getForecast: (city: string) => http(`${WEATHERSTACK_BASE_URL}/forecast?access_key=${WEATHERSTACK_API_KEY}&query=${city}&forecast_days=3`),
    getHistory: (city: string, date: string) => http(`${WEATHERSTACK_BASE_URL}/historical?access_key=${WEATHERSTACK_API_KEY}&query=${city}&historical_date=${date}`)
}

export default weatherApi;