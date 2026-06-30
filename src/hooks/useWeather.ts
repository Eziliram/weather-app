import weatherService from "@/service/weatherService";
import type { CurrentWeather, WeatherState } from "@/types/weather";
import React from "react"

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
                    data: currentWeatherData,
                } as CurrentWeather
            });
        } catch (error) {
            console.error("Error loading weather", error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }, [city]);

    React.useEffect(() => {
        loadWeather(city);
    }, [loadWeather]);

    return {
        weather,
        isLoading,
        hasError,
        forceRefresh: (city: string, forceRefresh: boolean) => loadWeather(city, forceRefresh),
    }
}