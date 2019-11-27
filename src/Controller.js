import {
    fetchCurrentWeather,
    fetchHistoricalWeather,
} from './Services/WeatherStack';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindOnLocationInputSelect(
            this.onLocationInputSelect.bind(this)
        );
        this.view.bindOnLocationInputChange(
            this.onLocationInputChange.bind(this)
        );
        this.view.bindOnCheckboxStateChange(
            this.onCheckboxStateChange.bind(this)
        );
        this.view.bindOnDateSelect(this.onDateSelect.bind(this));
    }

    async onLocationInputChange(query) {
        const suggestions = await this.model.fetchSuggestions(query);
        this.view.updateLocationSuggestions(suggestions);
    }

    async onLocationInputSelect(location) {
        this.view.renderCurrentWeatherLoader();
        this.location = location;

        if (this.isHistoricalSearchEnabled) {
            this.view.renderHistoricalWeatherLoader();
            const { current, historical } = await fetchHistoricalWeather({
                location,
                date: this.historicalDate,
            });
            this.view.renderCurrentWeatherStatus(location, current);
            this.view.renderHistoricalWeather(historical);
        } else {
            const { current } = await fetchCurrentWeather(location);
            this.view.renderCurrentWeatherStatus(location, current);
        }
    }

    onCheckboxStateChange(checked) {
        this.isHistoricalSearchEnabled = !!checked;
        if (checked) {
            this.view.renderDatePicker();
        } else {
            this.view.removeDatePicker();
            this.view.renderHistoricalWeather();
        }
    }

    async onDateSelect(date) {
        this.historicalDate = date;

        if (date && this.location) {
            this.view.renderHistoricalWeatherLoader();
            const { historical } = await this.model.fetchHistoricalWeather(
                this.location,
                date
            );
            this.view.renderHistoricalWeather(historical);
        }
    }
}

export default Controller;
