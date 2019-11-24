import { Autocomplete, Datepicker } from "materialize-css";
import {fetchSuggestions, fetchCurrentWeather, fetchHistoricalWeather} from "./Services/WeatherStack";
import {format} from "date-fns";

const DATE_FORMAT = 'yyyy-MM-dd';

let autocompleteInput;
let datepicker;
let temperature;
let weatherDescription;
let tableContent;

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

    const { weather } = await fetchCurrentWeather(location);

    temperature.innerText = weather.temperature;
    weatherDescription.innerText = weather.weather_descriptions[0];
};

const onDatepickerChange = async date => {
    const formattedDate = format(date, DATE_FORMAT);
    const { weather } = await fetchHistoricalWeather({ location: 'london', date: formattedDate });

    const historicalWeather = weather[formattedDate];

    temperature.innerText = historicalWeather.avgtemp;
    historicalWeather.hourly.forEach(hour => {
        const tableRow = document.createElement('tr');

        const time = document.createElement('td');
        time.innerText = hour.time;
        tableRow.appendChild(time);

        const temp = document.createElement('td');
        temp.innerText = hour.temperature;
        tableRow.appendChild(temp);

        const pressure = document.createElement('td');
        pressure.innerText = hour.pressure;
        tableRow.appendChild(pressure);

        tableContent.appendChild(tableRow);
    });
};

const autocompleteOptions = {
    data: {},
    onAutocomplete: onChange,
};

const datepickerOptions = {
    format: 'yyyy-mm-dd',
    onSelect: onDatepickerChange,
};

document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location-input');
    const datepickerInput = document.getElementById('datepicker');

    temperature = document.getElementById('temperature');
    weatherDescription = document.getElementById('weather-description');
    tableContent = document.querySelector('#historical-table .table-content');

    autocompleteInput = Autocomplete.init(locationInput, autocompleteOptions);
    datepicker = Datepicker.init(datepickerInput, datepickerOptions);

    locationInput.addEventListener('input', event => onInput(event.target.value));
});
