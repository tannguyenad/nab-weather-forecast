import { IWeather } from "../../types";
import { getCelsius, getDateString, getWeekDay } from "../../utils/weatherUtils";

interface IWeatherProps {
    data: IWeather;
}

export default function Weather(props: IWeatherProps): JSX.Element {
    const { data } = props;
    const day = getWeekDay(data.date);
    const date = getDateString(data.date);
    const minTemp = getCelsius(data.minTemp);
    const maxTemp = getCelsius(data.maxTemp);

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">{day}</h5>
                <p className="card-subtitle text-muted">{date}</p>
            </div>
            <div className="card-body">
                <div className="card-text">
                    <div>Min: {minTemp}</div>
                    <div>Max: {maxTemp}</div>
                </div>
            </div>
        </div>
    );
}
