import weatherApi from "@/api/weatherApi"
import { weatherCache } from "@/cache/weatherCache";

const refreshInBackground = async (city: string, cacheKey: string) => {
    try {
        const freshCurrentWeatherData = await weatherApi.getCurrent(city);
        weatherCache.set(cacheKey, freshCurrentWeatherData);
    } catch (error) {
        console.error("Error refreshing current weather data", error);
    }
}

const weatherService = {
    async getCurrent(city: string) {
        const cacheKey = `current-${city}`;

        const cachedWeather = weatherCache.get(cacheKey);

        // Check if cached current weather data exists in localStorage
        // Then, refresh the current weather data cache in the background
        // and return the cached weather data
        if (cachedWeather) {
            refreshInBackground(city, cacheKey);
            
            console.info("Fetching weather data from cache.");
            
            return cachedWeather;
        }

        // Otherwise
        // Fetch fresh current weather data from the weather API
        const freshCurrentWeatherData = await weatherApi.getCurrent(city);
        weatherCache.set(cacheKey, freshCurrentWeatherData);
        
        console.info("Fetching weather data from API.");
        
        return freshCurrentWeatherData;
    },

    getForecast() {
        return "Feature not supported.";
    },

    getHistory() {
        return "Feature not supported.";
    }
}

export default weatherService;