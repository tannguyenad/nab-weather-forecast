import React from "react";
import { cleanup, render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
    const queryClient = new QueryClient();
    const onSelectMock = jest.fn();
    const setup = () =>
        render(
            <QueryClientProvider client={queryClient}>
                <SearchBar onSelect={onSelectMock} />
            </QueryClientProvider>,
        );

    afterAll(() => {
        jest.restoreAllMocks();
        cleanup();
    });

    it("should render Autocomplete", () => {
        const { getByText } = setup();
        expect(getByText("Search city...")).toBeInTheDocument();
    });
});
