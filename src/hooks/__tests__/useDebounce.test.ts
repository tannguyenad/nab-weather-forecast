import { cleanup } from "@testing-library/react";
import { renderHook, RenderHookResult, Renderer } from "@testing-library/react-hooks";
import useDebounce from "../useDebounce";

describe("useDebounce", () => {
    const value = "foo";
    const updatedValue = "bar";

    const setup: () => RenderHookResult<string, string, Renderer<string>> = () => {
        return renderHook((value) => useDebounce<string>(value), { initialProps: value });
    };

    afterAll(cleanup);

    it("should update value", async () => {
        const { result, waitForNextUpdate, rerender } = setup();
        expect(result.current).toEqual(value);

        rerender(updatedValue);
        expect(result.current).toEqual(value);

        await waitForNextUpdate();
        expect(result.current).toEqual(updatedValue);
    });

    it("should get the latest value", async () => {
        const { result, waitForNextUpdate, rerender } = setup();
        expect(result.current).toEqual(value);

        rerender("foofoo");
        rerender("barbar");
        expect(result.current).toEqual(value);

        await waitForNextUpdate();
        expect(result.current).toEqual("barbar");
    });
});
