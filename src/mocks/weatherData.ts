import { ILocation, ILocationResponse, ILocationWeatherResponse, IWeather } from "../types";

export const MOCK_HOST = "http://localhost";
export const MOCK_DEFAULT_ERROR = {
    message: "something awful happened",
    code: "AWFUL_ERROR",
};

export const MOCK_LOCATIONS_RESPONSE: ILocationResponse[] = [
    {
        woeid: 111,
        title: "City1",
        location_type: "city",
    },
    {
        woeid: 112,
        title: "City2",
        location_type: "city",
    },
];

export const MOCK_LOCATIONS: ILocation[] = [
    {
        id: 111,
        name: "City1",
        type: "city",
    },
    {
        id: 112,
        name: "City2",
        type: "city",
    },
];

export const MOCK_LOCATION_WEATHER_RESPONSE: ILocationWeatherResponse = {
    woeid: 111,
    title: "NAB",
    location_type: "city",
    consolidated_weather: [
        { id: 111, max_temp: 9.67, min_temp: 2.88, applicable_date: "2021-11-25" },
        { id: 112, max_temp: 6.880000000000001, min_temp: -2.305, applicable_date: "2021-11-26" },
        { id: 113, max_temp: 11.04, min_temp: 3.885, applicable_date: "2021-11-27" },
        { id: 114, max_temp: 10.665, min_temp: -0.365, applicable_date: "2021-11-28" },
        { id: 115, max_temp: 13.06, min_temp: 2.3499999999999996, applicable_date: "2021-11-29" },
        { id: 116, max_temp: 13.184999999999999, min_temp: -0.25, applicable_date: "2021-11-30" },
    ],
};

export const MOCK_WEATHER_DATA: IWeather[] = [
    {
        date: "2021-11-25",
        id: 111,
        maxTemp: 9.67,
        minTemp: 2.88,
    },
    {
        date: "2021-11-26",
        id: 112,
        maxTemp: 6.880000000000001,
        minTemp: -2.305,
    },
    {
        date: "2021-11-27",
        id: 113,
        maxTemp: 11.04,
        minTemp: 3.885,
    },
    {
        date: "2021-11-28",
        id: 114,
        maxTemp: 10.665,
        minTemp: -0.365,
    },
    {
        date: "2021-11-29",
        id: 115,
        maxTemp: 13.06,
        minTemp: 2.3499999999999996,
    },
    {
        date: "2021-11-30",
        id: 116,
        maxTemp: 13.184999999999999,
        minTemp: -0.25,
    },
];
