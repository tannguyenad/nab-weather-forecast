import axios from "axios";
import { ILocation, ILocationResponse } from "../types";

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
}

export default new WeatherService();
