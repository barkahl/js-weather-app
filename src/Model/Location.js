import { fetchSuggestions } from '../Services/WeatherStack';

class Location {
    constructor() {
        this.suggestions = '';
        this.location = '';
    }

    async getSuggestions(query) {
        this.suggestions = await fetchSuggestions(query);
        return this.suggestions;
    }

    getLocation() {
        return this.location;
    }

    setLocation(location) {
        this.location = location;
    }
}

export default Location;
