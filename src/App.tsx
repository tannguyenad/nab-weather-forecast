import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LocationWeather from "./components/LocationWeather/LocationWeather";
import SearchBar from "./components/SearchBar/SearchBar";
import "./styles/main.scss";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { refetchOnWindowFocus: false, staleTime: 300000 },
    },
});

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <SearchBar />
                <LocationWeather />
            </QueryClientProvider>
        </div>
    );
}

export default App;
