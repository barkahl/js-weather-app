const fetchSuggestions = async query => {
    const url = `/api/autocomplete?query=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results || [];
};

const fetchWeather = async location => {
    const url = `/api/current?query=${location}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
        weather: data.current,
        location: data.location,
    };
};

export {
    fetchSuggestions,
    fetchWeather,
};
