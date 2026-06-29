import api from "./http";

const WEATHERSTACK_BASE_URL = "https://api.weatherstack.com/";

const weatherApi = {
    getCurrent: (city: string) => api(`${WEATHERSTACK_BASE_URL}/current?query=${city}`),
    getForecast: (city: string) => api(`${WEATHERSTACK_BASE_URL}/forecast?query=${city}&forecast_days=3`),
    getHistory: (city: string, date: string) => api(`${WEATHERSTACK_BASE_URL}/historical?query=${city}&historical_date=${date}`)
}

export default weatherApi;