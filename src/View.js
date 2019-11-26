import { Autocomplete, Datepicker } from 'materialize-css';
import { Chart } from 'chart.js';
import {createHistoricalDataTable, createLoader } from "./Utils/Dom";
import { formatTime } from './Utils/Helpers';

const autocompleteOptions = {
    data: {},
};

class View {
    constructor() {
        this.root = document.getElementById('root');

        const locationInputWrapper = document.createElement('div');
        locationInputWrapper.setAttribute('class', 'input-field');

        this.locationInput = document.createElement('input');
        this.locationInput.setAttribute('type', 'text');
        locationInputWrapper.append(this.locationInput);

        this.datePickerInput = document.createElement('input');
        this.datePickerInput.setAttribute('type', 'text');
        this.datePickerInput.setAttribute('class', 'datepicker');
        this.datePickerWrapper = document.createElement('div');
        this.datePickerWrapper.append(this.datePickerInput);

        this.weatherStatusWrapper = document.createElement('section');

        this.controls = document.createElement('div');
        this.controls.setAttribute('class', 'controls');
        this.historicalSearchModeCheckbox = document.createElement('input');
        this.historicalSearchModeCheckbox.setAttribute('type', 'checkbox');
        this.historicalSearchModeCheckbox.setAttribute('class', 'checkbox');

        this.controls.append(this.historicalSearchModeCheckbox);

        this.historicalWeatherWrapper = document.createElement('div');

        this.root.append(
            locationInputWrapper,
            this.weatherStatusWrapper,
            this.controls,
            this.historicalWeatherWrapper,
        );

        // this.bindOnLocationInputChange = this.bindOnLocationInputChange.bind(this);
        // this.bindOnLocationInputSelect = this.bindOnLocationInputSelect.bind(this);
        // this.updateLocationSuggestions = this.updateLocationSuggestions.bind(this);
    }

    bindOnLocationInputChange(handler) {
        this.locationInput.addEventListener(
            'input',
                event => handler(event.target.value)
        );
    };

    bindOnLocationInputSelect(handler) {
        this.autoCompleteInput = Autocomplete.init(this.locationInput, {
            ...autocompleteOptions,
            onAutocomplete: handler,
        });
    };

    bindOnCheckboxStateChange(handler) {
        this.historicalSearchModeCheckbox.addEventListener('change', event => handler(event.target.checked));
    }

    bindOnDateSelect(handler) {
        this.datePicker = Datepicker.init(this.datePickerInput, {
            format: 'yyyy-mm-dd',
            onSelect: handler,
        })
    }

    updateLocationSuggestions(suggestions) {
        console.log(suggestions);
        this.autoCompleteInput.updateData(
            suggestions.reduce(
                (acc, curr) => {
                    acc[curr.name] = null;
                    return acc;
                },
                {}
            )
        );
    }

    renderCurrentWeatherStatus(location, { temperature, pressure, weather_descriptions, weather_icons }) {
        const temperatureElement = document.createElement('span');
        temperatureElement.innerText = temperature + '°C';
        temperatureElement.setAttribute('class', 'item');

        const pressureElement = document.createElement('span');
        pressureElement.innerText = pressure + ' hPa';
        pressureElement.setAttribute('class', 'item');

        const descriptionWrapper = document.createElement(('div'));
        descriptionWrapper.setAttribute('class', 'description');

        const descriptionElements = weather_descriptions.map(description => {
            const element = document.createElement('span');
            element.innerText = description;
            element.setAttribute('class', 'item')
            return element;
        });

        const descriptionElementsWrapper = document.createElement('div');
        descriptionElementsWrapper.append(...descriptionElements);

        const iconElements = weather_icons.map(icon => {
            const element = document.createElement('img');
            element.setAttribute('src', icon);
            element.setAttribute('class', 'item icon');
            return element;
        });

        const iconElementsWrapper = document.createElement('div');
        iconElementsWrapper.append(...iconElements);

        descriptionWrapper.append(iconElementsWrapper, descriptionElementsWrapper);

        const weatherStatus = document.createElement('div');
        weatherStatus.setAttribute('class', 'weather-status');
        weatherStatus.append(
            temperatureElement,
            pressureElement,
            descriptionWrapper
        );

        const locationElement = document.createElement('h1');
        locationElement.setAttribute('class', 'location');
        locationElement.innerText = location;

        this.weatherStatusWrapper.innerHTML = '';
        this.weatherStatusWrapper.append(locationElement, weatherStatus);
    }

    renderCurrentWeatherLoader() {
        const loader = createLoader();
        this.weatherStatusWrapper.innerHTML = '';
        this.weatherStatusWrapper.append(loader);
    };

    renderDatePicker() {
        this.controls.appendChild(this.datePickerWrapper);
    };

    removeDatePicker() {
        this.controls.innerHTML = '';
        this.controls.append(this.historicalSearchModeCheckbox);
    }

    renderHistoricalWeatherLoader() {
        this.historicalWeatherWrapper.innerHTML = '';
        const loader = createLoader();
        this.historicalWeatherWrapper.append(loader);
    }

    renderHistoricalWeather(weather) {
        this.historicalWeatherWrapper.innerHTML = '';

        if (!weather) {
            return;
        }

        const chartElement = document.createElement('canvas');
        chartElement.setAttribute('class', 'temperature-chart');
        chartElement.setAttribute('width', 600);
        chartElement.setAttribute('height', 300);

        new Chart(chartElement, {
            type: 'line',
            data: {
                labels: weather.hourly.map(({time}) => formatTime(time)),
                datasets: [{
                    label: 'Temperature',
                    data: weather.hourly.map(({temperature}) => temperature),
                    fill: false,
                }]
            }
        });

        const historicalDataTable = createHistoricalDataTable(weather.hourly, 'historical-table');
        this.historicalWeatherWrapper.append(chartElement, historicalDataTable);
    }
}

export default View;
