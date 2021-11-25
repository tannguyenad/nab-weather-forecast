import React from "react";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import Autocomplete from "../Autocomplete/Autocomplete";
import "./SearchBar.scss";

export default function SearchBar() {
    const { isLoading, locations, search } = useLocationSearch();

    return (
        <div className="SearchBar app-bar navbar bg-dark">
            <div className="container py-3">
                <Autocomplete
                    labelKey="name"
                    placeholder="Search city..."
                    items={locations}
                    loading={isLoading}
                    onChange={search}
                    onSelect={(_) => {}}
                />
            </div>
        </div>
    );
}
