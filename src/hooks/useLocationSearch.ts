import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import WeatherService from "../services/weatherService";
import { ILocation, onChangeCallback } from "../types";
import useDebounce from "./useDebounce";

interface IUsePlaceSearchHook {
    isLoading: boolean;
    locations: ILocation[];
    search: onChangeCallback;
    error: Error | null;
}

export function useLocationSearch(): IUsePlaceSearchHook {
    const [query, setQuery] = useState<string>("");
    const searchText = useDebounce<string>(query);
    const search = useCallback<onChangeCallback>((value: string) => setQuery(value), []);

    const {
        isLoading,
        data: locations = [],
        error,
    } = useQuery<ILocation[], Error>(
        ["locations", searchText],
        () => WeatherService.searchLocations(searchText),
        { enabled: !!searchText },
    );

    return {
        isLoading,
        locations,
        search,
        error,
    };
}
