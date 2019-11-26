import {formatTime} from "./Helpers";

const createLoader = () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'progress');

    const loader = document.createElement('div');
    loader.setAttribute('class', 'indeterminate');

    wrapper.append(loader);
    return wrapper;
};

const createCell = value => {
    const cell = document.createElement('td');
    cell.innerText = value
    return cell;
};

const createImage = src => {
    const img = document.createElement('img');
    img.setAttribute('src', src);
    return img;
};

const createTableRow = data => {
    const tr = document.createElement('tr');

    const cells = [
        createCell(formatTime(data.time)),
        createCell(data.temperature),
        createCell(data.pressure),
        createCell(data.weather_descriptions[0]),
        createImage(data.weather_icons[0]),
    ];

    tr.append(...cells);

    return tr;
}

const createHistoricalDataTable = (data, className) => {
    const table = document.createElement('table');
    table.setAttribute('class', className);

    const thead = document.createElement('thead');
    const theadRow = document.createElement('tr');
    const theadRowCells = ['Time', 'Temperature', 'Pressure', 'Description'].map(title => {
        const th = document.createElement('th');
        th.innerText = title;
        return th;
    });
    theadRow.append(...theadRowCells);
    thead.append(theadRow);
    table.append(thead);

    const tbody = document.createElement('tbody');
    const rows = data.map(createTableRow);
    tbody.append(...rows);

    table.appendChild(tbody);
    return table;
};

export {
    createLoader,
    createHistoricalDataTable,
};
