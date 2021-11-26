import { ResponseComposition, rest, RestContext, RestRequest } from "msw";
import { ILocationResponse, ILocationWeatherResponse } from "../types";
import { MOCK_DEFAULT_ERROR, MOCK_LOCATIONS_RESPONSE, MOCK_LOCATION_WEATHER_RESPONSE } from "./weatherData";

const getSuccessHandler =
    <T>(response: T) =>
    (_req: RestRequest, res: ResponseComposition, ctx: RestContext) =>
        res(ctx.json(response));

const getErrorHandler =
    (status: number, error: Record<string, any> = MOCK_DEFAULT_ERROR) =>
    (_req: RestRequest, res: ResponseComposition, ctx: RestContext) =>
        res(ctx.status(status), ctx.json(error));

export const mockSearchLocationsWithSuccess = (response: ILocationResponse[] = MOCK_LOCATIONS_RESPONSE) => {
    return rest.get("/api/location/search/", getSuccessHandler(response));
};

export const mockSearchLocationsWithError = (status: number = 400, error?: Record<string, any>) => {
    return rest.get("/api/location/search/", getErrorHandler(status, error));
};

export const mockGetLocationsWeatherWithSuccess = (
    locationId: number = 111,
    response: ILocationWeatherResponse = MOCK_LOCATION_WEATHER_RESPONSE,
) => {
    return rest.get(`/api/location/${locationId}/`, getSuccessHandler(response));
};

export const mockGetLocationsWeatherWithError = (
    locationId: number = 111,
    status: number = 400,
    error?: Record<string, any>,
) => {
    return rest.get(`/api/location/${locationId}/`, getErrorHandler(status, error));
};
