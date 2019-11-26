import {fetchHistoricalWeather, fetchSuggestions} from "./Services/WeatherStack";
import { format } from 'date-fns';

class Model {
    constructor() {
        this.location = '';
    }

    getLocation() {
        return this.location;
    };

    setLocation(location) {
        this.location = location;
    };

    getCurrentWeather() {
        return this.currentWeather;
    };

    setCurrentWeather(currentWeather) {
        this.currentWeather = currentWeather;
    };

    fetchHistoricalWeather(date) {
        return fetchHistoricalWeather({ location: this.location, date });
    };

    fetchSuggestions(query) {
        return fetchSuggestions(query);
    }
}

export default Model;
