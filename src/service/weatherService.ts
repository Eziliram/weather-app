import weatherApi from "@/api/weatherApi"
import { weatherCache } from "@/cache/weatherCache";

const weatherService = {
    async getCurrent(city: string, forceRefresh = false) {
        const cacheKey = `current-${city}`;
        
        const cachedWeather = weatherCache.get(cacheKey);

        if (!forceRefresh) {
            
            // If cached current weather data exists in localStorage,
            // return the cached weather data
            if (cachedWeather) {
                console.info("Fetching weather data from cache.");
                return {
                    data: cachedWeather.data,
                    lastUpdated: cachedWeather.lastUpdated
                };
            }
        }

        // Otherwise,
        // fetch fresh current weather data from the weather API
        console.info("Fetching weather data from API.");
        
        const freshCurrentWeatherData = await weatherApi.getCurrent(city);
        weatherCache.set(cacheKey, freshCurrentWeatherData);
        return {
            data: freshCurrentWeatherData,
            lastUpdated: new Date()
        };
    },

    getForecast() {
        return "Feature not supported.";
    },

    getHistory() {
        return "Feature not supported.";
    }
}

export default weatherService;