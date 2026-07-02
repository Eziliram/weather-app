import weatherService from "@/service/weatherService";
import { type Weather, type WeatherState } from "@/types/weather";
import React from "react"
import { mockForecastData, mockHistoryData } from "./mockWeatherData";

export const useWeather = (city: string) => {
    const [weather, setWeather] = React.useState<WeatherState>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [hasError, setHasError] = React.useState<boolean>(false);

    const loadWeather = React.useCallback(async (selectedCity: string, forceRefresh = false) => {
        setIsLoading(true);
        try {
            const currentWeatherData = await weatherService.getCurrent(selectedCity, forceRefresh);
            setWeather({
                current: {
                    data: currentWeatherData.data,
                    cachedAt: currentWeatherData.lastUpdated
                } as Weather,
                // Weatherstacks free tier does not support
                // forecast or historical weather data,
                // so mocked data is used to demonstrate
                // the UI and overall application flow.
                forecast: mockForecastData as Weather[],
                history: mockHistoryData as Weather[],
            });
        } catch (error) {
            console.error("Error loading weather", error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Reload weather data whenever the selected city changes.
    React.useEffect(() => {
        loadWeather(city);
    }, [loadWeather, city]);

    return {
        weather,
        isLoading,
        hasError,
        // Expose a manual refresh action so the UI can
        // bypass the cache when the user requests fresh data.
        forceRefresh: (city: string, forceRefresh: boolean) => loadWeather(city, forceRefresh),
    }
}