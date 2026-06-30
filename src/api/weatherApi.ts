import http from "./http";

const WEATHERSTACK_API_KEY = "d84fe55ba099cab3cb0d5c4e46e484b7"; // NOTE: We should ideally pull this API key from a secrets manager
const WEATHERSTACK_BASE_URL = `https://api.weatherstack.com`;

const weatherApi = {
    getCurrent: (city: string) => http(`${WEATHERSTACK_BASE_URL}/current?access_key=${WEATHERSTACK_API_KEY}&query=${city}`),
    getForecast: (city: string) => http(`${WEATHERSTACK_BASE_URL}/forecast?access_key=${WEATHERSTACK_API_KEY}&query=${city}&forecast_days=3`),
    getHistory: (city: string, date: string) => http(`${WEATHERSTACK_BASE_URL}/historical?access_key=${WEATHERSTACK_API_KEY}&query=${city}&historical_date=${date}`)
}

export default weatherApi;