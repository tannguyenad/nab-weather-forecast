import React from "react";
import Select, { ActionMeta, components, ControlProps } from "react-select";
import { onChangeCallback } from "../../types";
import searchIcon from "../../assets/search.svg";

import "./Autocomplete.scss";

type JSONObject = Record<string, any>;

interface IAutoCompleteProps<TData extends JSONObject> {
    placeholder?: string;
    labelKey: keyof TData;
    valueKey: keyof TData;
    items: TData[];
    loading?: boolean;
    onChange: onChangeCallback;
    onSelect: (item: TData) => void;
}

const noOptionsMessage = () => "No results";

const Control = <TData extends JSONObject>({ children, ...props }: ControlProps<TData, false>) => {
    return (
        <components.Control {...props}>
            <div className="Autocomplete__leadingIcon">
                <img src={searchIcon} alt="Search" />
            </div>
            {children}
        </components.Control>
    );
};

export default function Autocomplete<TData extends JSONObject>(
    props: IAutoCompleteProps<TData>,
): JSX.Element {
    const { labelKey, valueKey, items, placeholder, loading, onChange, onSelect } = props;

    const getOptionValue = (item: TData) => item[valueKey];
    const getOptionLabel = (item: TData) => item[labelKey];

    const onOptionChanged = (value: string) => {
        // prevent calling API if the item is already existing
        const item = items.find((item: TData) =>
            item[labelKey].toString().toLowerCase().includes(value.toLowerCase()),
        );

        if (!item) {
            onChange(value);
        }
    };

    const onOptionSelected = (option: TData | null, actionMeta: ActionMeta<TData>) => {
        if (actionMeta.action === "clear") {
            onChange("");
            return;
        }

        if (actionMeta.action === "select-option" && option) {
            onSelect(option);
        }
    };

    return (
        <Select
            autoFocus
            isClearable
            className="Autocomplete"
            placeholder={placeholder}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            options={items}
            isLoading={loading}
            components={{ Control }}
            noOptionsMessage={noOptionsMessage}
            onInputChange={onOptionChanged}
            onChange={onOptionSelected}
        />
    );
}
