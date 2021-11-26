import { setupServer } from "msw/node";
import { mockGetLocationsWeatherWithSuccess, mockSearchLocationsWithSuccess } from "../../mocks/server";
import { MOCK_LOCATIONS, MOCK_WEATHER_DATA } from "../../mocks/weatherData";
import WeatherService from "../weatherService";

describe("WeatherService", () => {
    describe("searchLocations", () => {
        const server = setupServer(mockSearchLocationsWithSuccess());

        beforeAll(() => server.listen());
        afterEach(() => server.resetHandlers());
        afterAll(() => server.close());

        it("should transform response to locations list", async () => {
            const locations = await WeatherService.searchLocations("nab");
            expect(locations).toEqual(MOCK_LOCATIONS);
        });
    });

    describe("getLocationWeather", () => {
        const server = setupServer(mockGetLocationsWeatherWithSuccess());

        beforeAll(() => server.listen());
        afterEach(() => server.resetHandlers());
        afterAll(() => server.close());

        it("should transform response to list of weather info", async () => {
            const weathers = await WeatherService.getLocationWeather(111);
            expect(weathers).toEqual(MOCK_WEATHER_DATA);
        });
    });
});
