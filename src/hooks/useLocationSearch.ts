import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import WeatherService from "../services/weatherService";
import { ILocation, onChangeCallback } from "../types";
import useDebounce from "./useDebounce";

interface IUsePlaceSearchHook {
    isLoading: boolean;
    locations: ILocation[];
    search: onChangeCallback;
    error: AxiosError | null;
}

export function useLocationSearch(): IUsePlaceSearchHook {
    const [query, setQuery] = useState<string>("");
    const searchText = useDebounce<string>(query);
    const search = useCallback<onChangeCallback>((value: string) => setQuery(value), []);
    const handler = useCallback(() => WeatherService.searchLocations(searchText), [searchText]);

    const {
        isLoading,
        data: locations = [],
        error,
    } = useQuery<ILocation[], AxiosError>(["locations", searchText], handler, { enabled: !!searchText });

    return {
        isLoading,
        locations,
        search,
        error,
    };
}
