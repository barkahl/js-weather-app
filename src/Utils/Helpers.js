import { format, setHours } from 'date-fns';

const formatTime = time => {
    const date = new Date(null);
    return format(
        setHours(date, time/100),
        'HH:mm'
    );
};

export {
    formatTime
};
