import React from "react";
import { cleanup, render, waitFor } from "@testing-library/react";
import { QueryClientProvider } from "react-query";
import { setupServer } from "msw/node";
import { mockQueryClient } from "../../../mocks/queryClient";
import { mockGetLocationsWeatherWithError, mockGetLocationsWeatherWithSuccess } from "../../../mocks/server";
import { MOCK_LOCATIONS } from "../../../mocks/weatherData";
import { ILocation } from "../../../types";
import LocationWeather from "../LocationWeather";

describe("LocationWeather", () => {
    const setup = (location: ILocation) =>
        render(
            <QueryClientProvider client={mockQueryClient}>
                <LocationWeather location={location} />
            </QueryClientProvider>,
        );

    const server = setupServer(mockGetLocationsWeatherWithError());

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());

    afterAll(() => {
        server.close();
        cleanup();
    });

    it("should show error message", async () => {
        const { queryAllByRole, getByRole, queryByText } = setup(MOCK_LOCATIONS[0]);

        expect(queryByText("...")).toBeInTheDocument();
        expect(queryAllByRole("alert")).toHaveLength(0);

        await waitFor(() => getByRole("alert"));
        const alert = getByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert.textContent).toEqual("Request failed with status code 400");
    });

    it("should render Weather list", async () => {
        server.use(mockGetLocationsWeatherWithSuccess());

        const { queryAllByRole, getAllByRole, queryByText } = setup(MOCK_LOCATIONS[0]);
        const listBox = queryAllByRole("listbox");

        expect(listBox.length).toEqual(1);
        expect(listBox[0]).toBeInTheDocument();
        expect(queryByText("...")).toBeInTheDocument();
        expect(queryAllByRole("listitem")).toHaveLength(0);

        await waitFor(() => getAllByRole("listitem"));
        const items = getAllByRole("listitem");
        expect(items).toHaveLength(5);
        items.forEach((item) => expect(item).toBeInTheDocument());
        expect(queryByText("...")).not.toBeInTheDocument();
    });
});
