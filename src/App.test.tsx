import React from "react";
import { setupServer } from "msw/node";
import { cleanup, render, waitFor } from "@testing-library/react";
import App from "./App";
import { mockGetLocationsWeatherWithSuccess, mockSearchLocationsWithSuccess } from "./mocks/server";
import userEvent from "@testing-library/user-event";
import { MOCK_WEATHER_DATA } from "./mocks/weatherData";
import { getWeekDay } from "./utils/weatherUtils";

describe("App", () => {
    const setup = () => render(<App />);

    const server = setupServer(mockSearchLocationsWithSuccess());

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    afterAll(cleanup);

    it("should render App with SearchBar and LocationWeather", () => {
        const { getByRole } = setup();

        expect(getByRole("combobox")).toBeInTheDocument();
        expect(getByRole("heading")).toBeInTheDocument();
    });

    it("should show weather info corresponding to selected location", async () => {
        server.use(mockGetLocationsWeatherWithSuccess());

        const option = "City1";
        const { getByRole, getByText, getAllByText, queryAllByText } = setup();

        userEvent.type(getByRole("textbox"), "foo");
        await waitFor(() => getByText(option));
        const city = getByText(option);
        expect(city).toBeInTheDocument();
        userEvent.click(city);
        expect(queryAllByText(/^Min/)).toHaveLength(0);

        await waitFor(() => getAllByText(/^Min/));
        MOCK_WEATHER_DATA.slice(0, 5).forEach((item) =>
            expect(getByText(getWeekDay(item.date))).toBeInTheDocument(),
        );
    });
});
