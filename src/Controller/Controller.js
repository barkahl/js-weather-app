class Controller {
    constructor(weatherModel, locationModel, historicalDateModel, view) {
        this.weatherModel = weatherModel;
        this.locationModel = locationModel;
        this.historicalDateModel = historicalDateModel;
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
        const suggestions = await this.locationModel.getSuggestions(query);
        this.view.updateLocationSuggestions(suggestions);
    }

    async onLocationInputSelect(location) {
        this.locationModel.setLocation(location);
        this.view.renderCurrentWeatherLoader();

        if (this.isHistoricalSearchEnabled) {
            this.view.renderHistoricalWeatherLoader();
            const {
                current,
                historical,
            } = await this.weatherModel.getHistorical(
                location,
                this.historicalDateModel.getDate()
            );
            this.view.renderCurrentWeatherStatus(location, current);
            this.view.renderHistoricalWeather(historical);
        } else {
            const { current } = await this.weatherModel.getCurrent(location);
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
        this.historicalDateModel.setDate(date);
        const location = this.locationModel.getLocation();

        if (date && location) {
            this.view.renderHistoricalWeatherLoader();
            const { historical } = await this.weatherModel.getHistorical(
                location,
                date
            );
            this.view.renderHistoricalWeather(historical);
        }
    }
}

export default Controller;
