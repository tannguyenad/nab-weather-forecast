import axios from "axios";
import {
    IConsolidatedWeather,
    ILocation,
    ILocationResponse,
    ILocationWeatherResponse,
    IWeather,
} from "../types";

class WeatherService {
    async searchLocations(term: string): Promise<ILocation[]> {
        const { data = [] } = await axios.get<ILocationResponse[]>("/api/location/search/", {
            params: {
                query: term,
            },
        });

        return data.map<ILocation>((location: ILocationResponse) => {
            const { woeid: id, location_type: type, title: name } = location;

            return {
                id,
                name,
                type,
            };
        });
    }

    async getLocationWeather(locationId: number): Promise<IWeather[]> {
        const { data } = await axios.get<ILocationWeatherResponse>(`/api/location/${locationId}/`);
        const { consolidated_weather: consolidatedWeather = [] } = data;

        return consolidatedWeather.map<IWeather>((weather: IConsolidatedWeather) => {
            const { id, min_temp: minTemp, max_temp: maxTemp, applicable_date: date } = weather;

            return { id, minTemp, maxTemp, date };
        });
    }
}

export default new WeatherService();
