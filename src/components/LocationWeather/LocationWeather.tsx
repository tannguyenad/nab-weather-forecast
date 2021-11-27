import { useLocationWeather } from "../../hooks/useLocationWeather";
import { ILocation, IWeather } from "../../types";
import Weather from "./Weather";

import "./LocationWeather.scss";

interface ILocationWeatherProps {
    location?: ILocation;
}

export default function LocationWeather(props: ILocationWeatherProps): JSX.Element {
    const { location } = props;
    const { isLoading, data, error } = useLocationWeather(location?.id);

    return (
        <div className="LocationWeather py-4">
            <div className="container">
                <div className="text-center mb-4">
                    <h3 className="text-primary">{location?.name}</h3>
                    {isLoading && <h4>...</h4>}
                </div>
                {error?.message && (
                    <div className="alert alert-danger" role="alert">
                        {error?.message}
                    </div>
                )}
                <div className="row" role="listbox">
                    {data.map((weather: IWeather) => (
                        <div key={weather.id} className="col py-3" role="listitem">
                            <Weather data={weather} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
