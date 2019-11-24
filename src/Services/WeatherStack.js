const fetchSuggestions = async query => {
    const url = `/api/autocomplete?query=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results || [];
};

const fetchCurrentWeather = async location => {
    const url = `/api/current?query=${location}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
        weather: data.current,
        location: data.location,
    };
};

const fetchHistoricalWeather = async ({ location, date }) => {
    const url = `/api/historical?query=${location}&historical_date=${date}&hourly=1`;

    const response = await fetch(url);
    const data = await response.json();

    return {
        weather: data.historical,
        location: data.location,
    };
};

export {
    fetchSuggestions,
    fetchCurrentWeather,
    fetchHistoricalWeather,
};
