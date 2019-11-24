import { Autocomplete } from "materialize-css";
import {fetchSuggestions, fetchWeather} from "./Services/WeatherStack";

let autocompleteInput;
let temperature;
let weatherDescription;

const onInput = async query => {
    if (query.length < 3) {
        return;
    }

    const suggestions = await fetchSuggestions(query);

    autocompleteInput.updateData(
        suggestions.reduce(
            (acc, curr) => {
                acc[curr.name] = null;
                return acc;
            },
            {}
        )
    );
};

const onChange = async location => {
    if (!location) {
        return;
    }

    const { weather } = await fetchWeather(location);

    temperature.innerText = weather.temperature;
    weatherDescription.innerText = weather.weather_descriptions[0];
};

const options = {
    data: {},
    onAutocomplete: onChange,
};

document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location-input');
    temperature = document.getElementById('temperature');
    weatherDescription = document.getElementById('weather-description');

    autocompleteInput = Autocomplete.init(locationInput, options);

    locationInput.addEventListener('input', event => onInput(event.target.value));
});
