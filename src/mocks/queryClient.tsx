import React from "react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";

// turn off network error
setLogger({
    log: console.log,
    warn: console.warn,
    error: () => {},
});

export const mockQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: Infinity,
            retry: false,
        },
    },
});

export const getRenderHookOptions = () => {
    return {
        wrapper: ({ children }: { children: React.ReactNode[] }) => (
            <QueryClientProvider client={mockQueryClient}>{children}</QueryClientProvider>
        ),
    };
};
