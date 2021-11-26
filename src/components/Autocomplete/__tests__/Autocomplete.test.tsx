import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from "../Autocomplete";
import { ILocation } from "../../../types";
import { MOCK_LOCATIONS } from "../../../mocks/weatherData";

describe("Autocomplete", () => {
    const placeholder = "Search...";
    const onChangeMock = jest.fn();
    const onSelectMock = jest.fn();

    const setup = (items: ILocation[] = []) =>
        render(
            <Autocomplete
                placeholder={placeholder}
                labelKey="name"
                valueKey="id"
                items={items}
                onChange={onChangeMock}
                onSelect={onSelectMock}
            />,
        );

    afterEach(() => {
        onChangeMock.mockReset();
        onSelectMock.mockReset();
        cleanup();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("should render Autocomplete successfully", () => {
        const { getByRole, getByText } = setup();
        const searchIcon = getByRole("img");

        expect(searchIcon).toBeInTheDocument();
        expect(searchIcon.getAttribute("alt")).toBe("Search");
        expect(getByText(placeholder)).toBeInTheDocument();
        expect(getByRole("combobox")).toBeInTheDocument();
    });

    it("should show no results by default", () => {
        const { getByText } = setup();
        userEvent.click(getByText(placeholder));
        expect(getByText("No results")).toBeInTheDocument();
    });

    it("should call onChange when text gets change", () => {
        const text = "foo";
        const { getByText } = setup();

        userEvent.type(getByText(placeholder), text);
        expect(onChangeMock.mock.calls.length).toEqual(text.length);

        ["f", "fo", "foo"].forEach((val: string, index: number) =>
            expect(onChangeMock.mock.calls[index][0]).toEqual(val),
        );
    });

    it("should call onSelect when clicking on a suggesstion", () => {
        const { getByText } = setup(MOCK_LOCATIONS);

        userEvent.click(getByText(placeholder));
        userEvent.click(getByText(MOCK_LOCATIONS[0].name));

        expect(onSelectMock.mock.calls.length).toEqual(1);
        expect(onSelectMock.mock.calls[0][0]).toEqual(MOCK_LOCATIONS[0]);
    });
});
