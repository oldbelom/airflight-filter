import React from 'react';

export default function SortFilter({ setSortFilterValue }) {
    const handleChange = (event) => {
        setSortFilterValue(event.target.value);
    };
    return (
        <div className="filter">
            <h3 className="filter__title">Сортировать</h3>
            <div className="filter__content" onChange={handleChange}>
                <label className="filter__label">
                    <input
                        className="filter__input"
                        type="radio"
                        name="sort"
                        value="priceIncrease"
                    />
                    - по возрастанию цены
                </label>
                <label className="filter__label">
                    <input
                        className="filter__input"
                        type="radio"
                        name="sort"
                        value="priceDecrease"
                    />
                    - по убыванию цены
                </label>
                <label className="filter__label">
                    <input className="filter__input" type="radio" name="sort" value="flightTime" />-
                    по времени в пути
                </label>
            </div>
        </div>
    );
}
