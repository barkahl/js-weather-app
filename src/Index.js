import './style.scss';

import View from './View/View';
import Controller from './Controller/Controller';
import Weather from './Model/Weather';
import Location from './Model/Location';
import HistoricalDate from './Model/HistoricalDate';

new Controller(new Weather(), new Location(), new HistoricalDate(), new View());
