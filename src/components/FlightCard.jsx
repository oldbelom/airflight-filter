import React from 'react';
import { ReactComponent as Clock } from '../assets/clock.svg';

export default function FlightCard({ item }) {
    return (
        <div className="card">
            <div className="card__title">
                <div className="card__logo">{item.logo}</div>
                <div className="card__price">
                    <span>{item.price} &#8381;</span>
                    <span className="card__price-info">
                        Стоимость для одного взрослого пассажира
                    </span>
                </div>
            </div>
            <div className="card__forward">
                <div className="card__place">
                    <div className="card__airport">
                        {item.forward.departureCity}, {item.forward.departureAirport}
                        <span className="card__airport-id">
                            &nbsp;({item.forward.departureAirportUid})
                        </span>
                    </div>
                    <span className="card__arrow-ico">&#10230;</span>
                    <div className="card__airport">
                        {item.forward.arrivalCity}, {item.forward.arrivalAirport}
                        <span className="card__airport-id">
                            &nbsp;({item.forward.arrivalAirportUid})
                        </span>
                    </div>
                </div>
                <div className="card__date">
                    <div className="card__date-inner">
                        <span className="card__time">{item.forward.departureTime} </span>
                        <span className="card__day">{item.forward.departureDay}</span>
                    </div>
                    <div className="card__duration">
                        <Clock className="card__clock-ico" />
                        <span>{item.forward.duration}</span>
                    </div>
                    <div className="card__date-inner">
                        <span className="card__day">{item.forward.arrivalDay} </span>
                        <span className="card__time">{item.forward.arrivalTime}</span>
                    </div>
                </div>
                <div className="card__transfer">
                    {item.forward.transferAmount ? <span>1 пересадка</span> : null}
                </div>
                <div className="card__carrier">Рейс выполняет: {item.forward.carrier}</div>
            </div>
            <div className="card__back">
                <div className="card__place">
                    <div className="card__airport">
                        {item.back.departureCity}, {item.back.departureAirport}
                        <span className="card__airport-id">
                            &nbsp;({item.back.departureAirportUid})
                        </span>
                    </div>
                    <span className="card__arrow-ico">&#10230;</span>
                    <div className="card__airport">
                        {item.back.arrivalCity}, {item.back.arrivalAirport}
                        <span className="card__airport-id">
                            &nbsp;({item.back.arrivalAirportUid})
                        </span>
                    </div>
                </div>
                <div className="card__date">
                    <div className="card__date-inner">
                        <span className="card__time">{item.back.departureTime} </span>
                        <span className="card__day">{item.back.departureDay}</span>
                    </div>
                    <div className="card__duration">
                        <Clock className="card__clock-ico" />
                        <span>{item.back.duration}</span>
                    </div>
                    <div className="card__date-inner">
                        <span className="card__day">{item.back.arrivalDay} </span>
                        <span className="card__time">{item.back.arrivalTime}</span>
                    </div>
                </div>
                <div className="card__transfer">
                    {item.back.transferAmount ? <span>1 пересадка</span> : null}
                </div>
                <div className="card__carrier">Рейс выполняет: {item.back.carrier}</div>
            </div>
            <button className="card__btn">выбрать</button>
        </div>
    );
}
