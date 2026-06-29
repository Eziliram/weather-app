import weatherApi from "@/api/weatherApi"

const weatherService = {
    async getCurrent(city: string) {
        const data = await weatherApi.getCurrent(city);
        // TODO: map data -> mapWeatherResponse(data)
        return data;
    },

    getForecast() {
        return "Forecast unavailable";
    },

    getHistory() {
        return "History unavailable";
    }
}

export default weatherService;