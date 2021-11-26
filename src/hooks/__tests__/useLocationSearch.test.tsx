import { act, renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { useLocationSearch } from "../useLocationSearch";
import WeatherService from "../../services/weatherService";
import { MOCK_LOCATIONS } from "../../mocks/weatherData";
import { mockSearchLocationsWithError, mockSearchLocationsWithSuccess } from "../../mocks/server";
import { getRenderHookOptions } from "../../mocks/queryClient";

describe("useLocationSearch", () => {
    const setup = () => renderHook(() => useLocationSearch(), getRenderHookOptions());

    describe("Error", () => {
        const server = setupServer(mockSearchLocationsWithError());

        beforeAll(() => server.listen());
        afterEach(() => server.resetHandlers());
        afterAll(() => server.close());

        it("should return error with empty list", async () => {
            const { result, waitForNextUpdate, waitFor } = setup();

            act(() => result.current.search("foo"));
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.locations.length).toEqual(0);

            await waitForNextUpdate();
            expect(result.current.isLoading).toEqual(true);

            await waitFor(() => !result.current.isLoading);
            expect(result.current.error).not.toBeNull();
            expect(result.current.locations.length).toEqual(0);
        });
    });

    describe("Success", () => {
        const server = setupServer(mockSearchLocationsWithSuccess());

        beforeAll(() => server.listen());
        afterEach(() => {
            server.resetHandlers();
            jest.restoreAllMocks();
        });
        afterAll(() => server.close());

        it("should send a request if search text is not empty", async () => {
            const { result, waitForNextUpdate, waitFor } = setup();

            expect(result.current.isLoading).toEqual(false);
            expect(result.current.locations).toHaveLength(0);

            act(() => result.current.search("foo"));
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.locations).toHaveLength(0);

            await waitForNextUpdate();
            expect(result.current.isLoading).toEqual(true);

            await waitFor(() => !result.current.isLoading);
            expect(result.current.isLoading).toEqual(false);
            expect(result.current.locations).toEqual(MOCK_LOCATIONS);
        });

        it("should NOT send a request if search text is empty", async () => {
            const mockSearchLocations = jest.spyOn(WeatherService, "searchLocations");
            mockSearchLocations.mockResolvedValue([]);

            const { result, waitForNextUpdate } = setup();

            act(() => result.current.search("bar"));
            expect(mockSearchLocations).toHaveBeenCalledTimes(0);

            await waitForNextUpdate();
            expect(mockSearchLocations).toHaveBeenCalledTimes(1);

            act(() => result.current.search(""));
            await waitForNextUpdate();
            expect(mockSearchLocations).toHaveBeenCalledTimes(1);
        });
    });
});
