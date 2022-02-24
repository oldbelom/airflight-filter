import React from 'react';
import FlightCard from './FlightCard';

export default function SearchResult({ flightsToShow, setCardsShowCount }) {
    const handleShowMore = () => {
        setCardsShowCount((prev) => prev + 2);
    };

    return (
        <div className="result">
            {flightsToShow &&
                flightsToShow.map((item, index) => <FlightCard key={index} item={item} />)}
            <div className="result__btn-wrapper">
                <button className="result__btn" onClick={handleShowMore}>
                    Показать ещё
                </button>
            </div>
        </div>
    );
}
