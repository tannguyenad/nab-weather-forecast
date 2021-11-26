const LOCALE = "en-US";

export function isToday(date: Date) {
    return date.toLocaleDateString(LOCALE) === new Date().toLocaleDateString(LOCALE);
}

export function getWeekDay(dateString: string): string {
    const date = new Date(dateString);

    if (isToday(date)) {
        return "Today";
    }

    return date.toLocaleDateString(LOCALE, { weekday: "long" });
}

export function getDateString(dateString: string): string {
    return new Date(dateString).toLocaleDateString(LOCALE, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

export function getCelsius(value: number): string {
    return `${Math.round(value)}°C`;
}
