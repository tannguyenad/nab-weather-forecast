import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import LocationWeather from "./components/LocationWeather/LocationWeather";
import SearchBar from "./components/SearchBar/SearchBar";
import "./styles/main.scss";
import { ILocation } from "./types";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { refetchOnWindowFocus: false, staleTime: 300000 },
    },
});

function App() {
    const [location, setLocation] = useState<ILocation>();

    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <SearchBar onSelect={setLocation} />
                <LocationWeather location={location} />
            </QueryClientProvider>
        </div>
    );
}

export default App;
