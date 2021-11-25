import { useLocationWeather } from "../../hooks/useLocationWeather";
import { ILocation, IWeather } from "../../types";
import Weather from "./Weather";

import "./LocationWeather.scss";

interface ILocationWeatherProps {
    location?: ILocation;
}

export default function LocationWeather(props: ILocationWeatherProps) {
    const { location } = props;
    const { isLoading, data } = useLocationWeather(location?.id);

    return (
        <div className="LocationWeather py-4">
            <div className="container">
                <div className="text-center mb-3">
                    <h3>{location?.name}</h3>
                    {isLoading && <h4>...</h4>}
                </div>
                <div className="row">
                    {data.map((weather: IWeather) => (
                        <div key={weather.id} className="col py-3">
                            <Weather data={weather} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
