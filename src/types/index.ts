export interface ILocation {
    id: number;
    name: string;
    type: string;
}

export interface ILocationResponse {
    woeid: number;
    title: string;
    location_type: string;
}

export type onChangeCallback = (value: string) => void;

export interface IWeather {
    id: number;
    date: string;
    minTemp: number;
    maxTemp: number;
}

export interface IConsolidatedWeather {
    id: number;
    min_temp: number;
    max_temp: number;
    applicable_date: string;
}

export interface ILocationWeatherResponse extends ILocationResponse {
    consolidated_weather: IConsolidatedWeather[];
}
