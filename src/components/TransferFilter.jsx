import React from 'react';

export default function TransferFilter({ transferFilterValue, setTransferFilterValue }) {
    const handleChange = (event) => {
        if (transferFilterValue.includes(event.target.value)) {
            setTransferFilterValue((prev) => [
                ...prev.filter((item) => item !== event.target.value),
            ]);
        } else {
            setTransferFilterValue((prev) => [...prev, event.target.value]);
        }
    };
    return (
        <div className="filter">
            <h3 className="filter__title">Фильтровать</h3>
            <div className="filter__content">
                <label className="filter__label">
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        name="transfer"
                        value="oneTransfer"
                        className="filter__input"
                    />
                    - 1 пересадка
                </label>
                <label className="filter__label">
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        name="transfer"
                        value="withoutTransfer"
                        className="filter__input"
                    />
                    - без пересадок
                </label>
            </div>
        </div>
    );
}
