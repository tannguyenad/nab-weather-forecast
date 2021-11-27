import React from "react";
import { useLocationSearch } from "../../hooks/useLocationSearch";
import { ILocation } from "../../types";
import Autocomplete from "../Autocomplete/Autocomplete";
import "./SearchBar.scss";

interface ISearchBarProps {
    onSelect: (location: ILocation) => void;
}

export default function SearchBar(props: ISearchBarProps): JSX.Element {
    const { onSelect } = props;
    const { isLoading, locations, search } = useLocationSearch();

    return (
        <div className="SearchBar app-bar navbar bg-dark">
            <div className="container py-3">
                <Autocomplete
                    labelKey="name"
                    valueKey="id"
                    placeholder="Search city..."
                    items={locations}
                    loading={isLoading}
                    onChange={search}
                    onSelect={onSelect}
                />
            </div>
        </div>
    );
}
