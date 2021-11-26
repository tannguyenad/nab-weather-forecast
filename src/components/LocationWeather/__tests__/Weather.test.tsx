import { cleanup, render } from "@testing-library/react";
import React from "react";
import Weather from "../Weather";

describe("Weather", () => {
    const setup = () =>
        render(<Weather data={{ id: 911, date: "2020-11-01", minTemp: 15.3, maxTemp: 18.6 }} />);

    afterEach(cleanup);

    it("should render Weather properly", () => {
        const { getByText } = setup();
        expect(getByText("Sunday")).toBeInTheDocument();
        expect(getByText("Nov 1, 2020")).toBeInTheDocument();
        expect(getByText("Min: 15°C")).toBeInTheDocument();
        expect(getByText("Max: 19°C")).toBeInTheDocument();
    });
});
