import React from 'react';
import SearchResult from './components/SearchResult';
import './App.css';
import data from './flights.json';
import {
    getCleanedData,
    getMaxPrice,
    filterByTransfer,
    filterByPrice,
    filterByCarrier,
    sortFlights,
    getCarriers,
} from './utils';
import SortFilter from './components/SortFilter';
import TransferFilter from './components/TransferFilter';
import PriceFilter from './components/PriceFilter';
import CarrierFilter from './components/CarrierFilter';

const {
    result: { flights },
} = data;
const cleanedArray = flights.map(getCleanedData);
const maxPrice = getMaxPrice(cleanedArray);

function App() {
    const [flightsToShow, setFlightsToShow] = React.useState([]);
    const [cardsShowCount, setCardsShowCount] = React.useState(2);

    const [sortFilterValue, setSortFilterValue] = React.useState('');
    const [transferFilterValue, setTransferFilterValue] = React.useState([]);
    const [priceFilterValue, setPriceFilterValue] = React.useState([0, maxPrice]);
    const [carrierFilterValue, setCarrierFilterValue] = React.useState([]);

    React.useEffect(() => {
        const carriers = Object.keys(getCarriers(cleanedArray));
        setCarrierFilterValue(carriers);
    }, []);

    React.useEffect(() => {
        let _flights = [...cleanedArray];
        _flights = filterByTransfer(_flights, transferFilterValue);
        _flights = filterByPrice(_flights, priceFilterValue[0], priceFilterValue[1]);
        _flights = filterByCarrier(_flights, carrierFilterValue);
        _flights = sortFlights(_flights, sortFilterValue);
        setFlightsToShow([..._flights.slice(0, cardsShowCount)]);
    }, [
        transferFilterValue,
        priceFilterValue,
        sortFilterValue,
        carrierFilterValue,
        cardsShowCount,
    ]);

    return (
        <div className="app">
            <div className="filters">
                <SortFilter setSortFilterValue={setSortFilterValue} />
                <TransferFilter
                    transferFilterValue={transferFilterValue}
                    setTransferFilterValue={setTransferFilterValue}
                />
                <PriceFilter
                    priceFilterValue={priceFilterValue}
                    setPriceFilterValue={setPriceFilterValue}
                />
                <CarrierFilter
                    flights={cleanedArray}
                    carrierFilterValue={carrierFilterValue}
                    setCarrierFilterValue={setCarrierFilterValue}
                />
            </div>
            <SearchResult setCardsShowCount={setCardsShowCount} flightsToShow={flightsToShow} />
        </div>
    );
}

export default App;
