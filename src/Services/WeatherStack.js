import { format } from 'date-fns';

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
        current: data.current,
        location: data.location,
    };
};

const fetchHistoricalWeather = async ({ location, date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const url = `/api/historical?query=${location}&historical_date=${formattedDate}&hourly=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return {
            current: data.current,
            historical: data.historical[formattedDate],
            location: data.location,
        };
    } catch (err) {
        console.log(err);
    }
};

export { fetchSuggestions, fetchCurrentWeather, fetchHistoricalWeather };
