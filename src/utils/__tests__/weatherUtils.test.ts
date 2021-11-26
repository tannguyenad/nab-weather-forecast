import { getCelsius, getDateString, getWeekDay, isToday } from "../weatherUtils";

describe("weatherUtils", () => {
    describe("isToday", () => {
        it("should return false", () => {
            const date = new Date("2010/01/01");
            expect(isToday(date)).toBeFalsy();
        });

        it("should return true", () => {
            const date = new Date();
            expect(isToday(date)).toBeTruthy();
        });
    });

    describe("getWeekDay", () => {
        it.each([
            ["2021/11/01", "Monday"],
            ["2021/11/02", "Tuesday"],
            ["2021/11/03", "Wednesday"],
            ["2021/11/04", "Thursday"],
            ["2021/11/05", "Friday"],
            ["2021/11/06", "Saturday"],
            ["2021/11/07", "Sunday"],
            [new Date().toISOString(), "Today"],
        ])("should convert %s to %s", (dateString, weekday) => {
            expect(getWeekDay(dateString)).toEqual(weekday);
        });
    });

    describe("getDateString", () => {
        it.each([
            ["2021/11/01", "Nov 1, 2021"],
            ["foo", "Invalid Date"],
        ])("should convert '%s' to '%s'", (date, expected) => {
            expect(getDateString(date)).toEqual(expected);
        });
    });

    describe("getCelsius", () => {
        it.each([
            [2.33333, "2°C"],
            [5, "5°C"],
            [15.7, "16°C"],
            [22.4, "22°C"],
        ])("should convert %d to %s", (number, expected) => {
            expect(getCelsius(number)).toEqual(expected);
        });
    });
});
