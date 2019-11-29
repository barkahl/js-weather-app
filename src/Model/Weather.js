import {
    fetchCurrentWeather,
    fetchHistoricalWeather,
} from '../Services/WeatherStack';

class Weather {
    constructor() {
        this.current = {};
        this.historical = {};
    }

    async getCurrent(location) {
        this.current = await fetchCurrentWeather(location);
        return this.current;
    }

    async getHistorical(location, date) {
        this.historical = await fetchHistoricalWeather({ location, date });
        return this.historical;
    }
}

export default Weather;
