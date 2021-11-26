import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { getRenderHookOptions } from "../../mocks/queryClient";
import { mockGetLocationsWeatherWithError, mockGetLocationsWeatherWithSuccess } from "../../mocks/server";
import { MOCK_WEATHER_DATA } from "../../mocks/weatherData";
import WeatherService from "../../services/weatherService";
import { useLocationWeather } from "../useLocationWeather";

describe("useLocationWeather", () => {
    const setup = (locationId?: number) =>
        renderHook(() => useLocationWeather(locationId), getRenderHookOptions());

    describe("Error", () => {
        const server = setupServer(mockGetLocationsWeatherWithError());

        beforeAll(() => server.listen());
        afterEach(() => server.resetHandlers());
        afterAll(() => server.close());

        it("should return error with empty list", async () => {
            const { result, waitFor } = setup(111);

            expect(result.current.isLoading).toEqual(true);
            expect(result.current.data).toHaveLength(0);

            await waitFor(() => !result.current.isLoading);
            expect(result.current.error).not.toBeNull();
            expect(result.current.data).toHaveLength(0);
        });
    });

    describe("Success", () => {
        const server = setupServer(mockGetLocationsWeatherWithSuccess());

        beforeAll(() => server.listen());
        afterEach(() => {
            server.resetHandlers();
            jest.restoreAllMocks();
        });
        afterAll(() => server.close());

        it("should response list of weather data", async () => {
            const { result, waitFor } = setup(111);

            expect(result.current.data).toHaveLength(0);
            expect(result.current.isLoading).toEqual(true);

            await waitFor(() => !result.current.isLoading);
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.data).toEqual(MOCK_WEATHER_DATA.slice(0, 5));
        });

        it("should response to empty list if locationId is not defined", async () => {
            const mockGetLocationWeather = jest.spyOn(WeatherService, "getLocationWeather");
            mockGetLocationWeather.mockResolvedValue([]);

            const { result, rerender } = setup();
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.data).toHaveLength(0);
            expect(mockGetLocationWeather).toHaveBeenCalledTimes(0);

            rerender();
            expect(mockGetLocationWeather).toHaveBeenCalledTimes(0);
        });
    });
});
