import React from 'react';

export default function PriceFilter({ priceFilterValue, setPriceFilterValue }) {
    const handleChange = (event) => {
        if (event.target.name === 'from') {
            setPriceFilterValue((prev) => [+event.target.value, prev[1]]);
        } else if (event.target.name === 'to') {
            setPriceFilterValue((prev) => [prev[0], +event.target.value]);
        }
    };

    return (
        <div className="filter">
            <h3 className="filter__title">Цена</h3>
            <div className="filter__content">
                <label className="filter__label filter__label_price">
                    <span>От</span>
                    <input
                        className="filter__input"
                        onChange={handleChange}
                        type="number"
                        name="from"
                        value={priceFilterValue[0]}
                    />
                </label>
                <label className="filter__label filter__label_price">
                    <span>До</span>
                    <input
                        className="filter__input"
                        onChange={handleChange}
                        type="number"
                        name="to"
                        value={priceFilterValue[1]}
                    />
                </label>
            </div>
        </div>
    );
}
