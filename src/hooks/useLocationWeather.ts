import { AxiosError } from "axios";
import { useCallback } from "react";
import { useQuery } from "react-query";
import WeatherService from "../services/weatherService";
import { IWeather } from "../types";

interface ILocationWeatherHook {
    isLoading: boolean;
    data: IWeather[];
    error: AxiosError | null;
}

export function useLocationWeather(locationId?: number, numOfDays: number = 5): ILocationWeatherHook {
    const isNumber = typeof locationId === "number";
    const handler = useCallback(
        () => (isNumber ? WeatherService.getLocationWeather(locationId) : []),
        [locationId, isNumber],
    );

    const {
        isLoading,
        data = [],
        error,
    } = useQuery<IWeather[], AxiosError>(["locationWeather", locationId], handler, { enabled: isNumber });

    return {
        isLoading,
        data: data.slice(0, numOfDays),
        error,
    };
}
