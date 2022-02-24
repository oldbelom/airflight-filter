import React from 'react';
import { getCarriers } from '../utils';

export default function CarrierFilter({ flights, carrierFilterValue, setCarrierFilterValue }) {
    const carriers = Object.entries(getCarriers(flights));

    const handleChange = (event) => {
        if (carrierFilterValue.indexOf(event.target.value) >= 0) {
            setCarrierFilterValue((prev) => [
                ...prev.filter((item) => item !== event.target.value),
            ]);
        } else {
            setCarrierFilterValue((prev) => [...prev, event.target.value]);
        }
    };

    return (
        <div className="filter">
            <h3 className="filter__title">Авиакомпании</h3>
            <div className="filter__content">
                {carriers &&
                    carriers.map((item, index) => (
                        <label className="filter__label filter__label_truncate" key={index}>
                            <input
                                onChange={handleChange}
                                type="checkbox"
                                name="carrier"
                                value={item[0]}
                                className="filter__input"
                                checked={carrierFilterValue.indexOf(item[0]) !== -1 ? true : false}
                            />
                            <span>-&nbsp;</span>
                            <span className="truncate-text">{item[0]}</span>
                            <span> от {item[1]} р.</span>
                        </label>
                    ))}
            </div>
        </div>
    );
}
