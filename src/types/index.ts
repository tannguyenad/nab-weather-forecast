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
