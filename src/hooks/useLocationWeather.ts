import { useQuery } from "react-query";
import WeatherService from "../services/weatherService";
import { IWeather } from "../types";

interface ILocationWeatherHook {
    isLoading: boolean;
    data: IWeather[];
    error: Error | null;
}

export function useLocationWeather(locationId?: number, numOfDays: number = 5): ILocationWeatherHook {
    const {
        isLoading,
        data = [],
        error,
    } = useQuery<IWeather[], Error>(["locationWeather", locationId], () =>
        locationId ? WeatherService.getLocationWeather(locationId) : [],
    );

    return {
        isLoading,
        data: data.slice(0, numOfDays),
        error,
    };
}
