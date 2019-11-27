import {
    fetchHistoricalWeather,
    fetchSuggestions,
} from './Services/WeatherStack';

class Model {
    constructor() {
        this.location = '';
    }

    getLocation() {
        return this.location;
    }

    setLocation(location) {
        this.location = location;
    }

    getCurrentWeather() {
        return this.currentWeather;
    }

    setCurrentWeather(currentWeather) {
        this.currentWeather = currentWeather;
    }

    fetchHistoricalWeather(location, date) {
        return fetchHistoricalWeather({ location, date });
    }

    fetchSuggestions(query) {
        return fetchSuggestions(query);
    }
}

export default Model;
