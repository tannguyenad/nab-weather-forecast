import React from "react";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Autocomplete from "../Autocomplete";

describe("Autocomplete", () => {
    describe("Default UI", () => {
        const noop = () => {};

        const setup = () =>
            render(
                <Autocomplete
                    placeholder="Search..."
                    labelKey="name"
                    items={[]}
                    onChange={noop}
                    onSelect={noop}
                />,
            );

        afterEach(cleanup);

        it("should render an input field", () => {
            const { getByRole } = setup();
            const inputEl = getByRole("textbox");

            expect(inputEl).toBeInTheDocument();
            expect(inputEl.getAttribute("placeholder")).toBe("Search...");
        });

        it("should render search icon", () => {
            const { getByRole } = setup();
            const searchIcon = getByRole("img");

            expect(searchIcon).toBeInTheDocument();
            expect(searchIcon.getAttribute("alt")).toBe("Search");
        });

        it("should render spinner", () => {
            const { getByText } = setup();
            const spinner = getByText("Loading...");

            expect(spinner).toBeInTheDocument;
        });

        it("should NOT render list items", () => {
            const { queryAllByRole } = setup();
            const items = queryAllByRole("listitem");

            expect(items.length).toBe(0);
        });
    });

    describe("Suggession", () => {
        const items = [
            {
                id: 1,
                label: "Option 1",
            },
            {
                id: 2,
                label: "Option 2",
            },
        ];
        const onChangeMock = jest.fn();
        const onSelectMock = jest.fn();

        const setup = () =>
            render(
                <Autocomplete
                    placeholder="Search..."
                    labelKey="label"
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

        it("should render suggessions", () => {
            const { getByRole, queryAllByRole, getByText } = setup();
            userEvent.type(getByRole("textbox"), "something");

            expect(queryAllByRole("option").length).toBe(2);
            items.forEach((item) => {
                expect(getByText(item.label)).toBeInTheDocument();
            });
        });

        it("should NOT render suggessions", () => {
            const { queryAllByRole } = setup();

            expect(queryAllByRole("option").length).toBe(0);
        });

        it("should call onChange when text gets change", () => {
            const text = "foo";
            const { getByRole } = setup();

            userEvent.type(getByRole("textbox"), text);
            expect(onChangeMock.mock.calls.length).toEqual(text.length);

            ["f", "fo", "foo"].forEach((val: string, index: number) =>
                expect(onChangeMock.mock.calls[index][0]).toEqual(val),
            );
        });

        it("should call onSelect when clicking on a suggesstion", () => {
            const option = "Option 1";
            const { getByRole, getByText } = setup();

            userEvent.type(getByRole("textbox"), "foo");
            userEvent.click(getByText(option));

            expect(onSelectMock.mock.calls.length).toEqual(1);
            expect(onSelectMock.mock.calls[0][0]).toEqual(items[0]);
        });
    });
});
