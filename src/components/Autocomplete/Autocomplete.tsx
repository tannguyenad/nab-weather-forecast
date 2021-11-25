import React, { FormEvent, useState } from "react";
import Autosuggest, {
    ChangeEvent,
    InputProps,
    SuggestionSelectedEventData,
    SuggestionsFetchRequestedParams,
} from "react-autosuggest";
import searchIcon from "../../assets/search.svg";
import { onChangeCallback } from "../../types";

import "./Autocomplete.scss";

interface IAutoCompleteProps<T extends Record<string, any>> {
    placeholder?: string;
    labelKey: keyof T;
    items: T[];
    loading?: boolean;
    onChange: onChangeCallback;
    onSelect: (item: T) => void;
}

const noop = () => {};

export default function Autocomplete<T extends Record<string, any>>(props: IAutoCompleteProps<T>) {
    const { labelKey, items, placeholder, loading, onChange, onSelect } = props;
    const [value, setValue] = useState<string>("");

    const getSuggestionValue = (item: T) => item[labelKey];
    const renderSuggestion = (item: T) => <span>{item[labelKey]}</span>;

    const onValueChanged = (_event: FormEvent<HTMLElement>, params: ChangeEvent) => setValue(params.newValue);
    const onSuggestionSelected = (_event: FormEvent<HTMLElement>, data: SuggestionSelectedEventData<T>) =>
        onSelect(data.suggestion);

    const onSuggestionsFetchRequested = (params: SuggestionsFetchRequestedParams) => {
        const { value, reason } = params;

        if (reason === "input-changed") {
            onChange(value);
        }
    };

    const inputProps: InputProps<T> = {
        placeholder,
        value,
        onChange: onValueChanged,
        className: "form-control",
    };

    const classNames = "Autocomplete" + (loading ? " loading" : "");

    return (
        <div className={classNames}>
            <Autosuggest
                suggestions={items}
                inputProps={inputProps}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={renderInput}
                onSuggestionSelected={onSuggestionSelected}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={noop}
            />
        </div>
    );
}

/**
 * Render custom input with search icon and spinner for loading state
 * @param props
 * @returns
 */
function renderInput(props: React.HTMLProps<HTMLInputElement>) {
    return (
        <>
            <div className="Autocomplete__leadingIcon">
                <img src={searchIcon} alt="Search" />
            </div>
            <input type="text" {...props} />
            <div className="Autocomplete__spinner">
                <div className="spinner-border text-info spinner-border-md" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
}
