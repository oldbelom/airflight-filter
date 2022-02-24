export const getCleanedData = item => {
    const forwardTransferAmount = item.flight.legs[0].segments.length - 1;
    const backTransferAmount = item.flight.legs[1].segments.length - 1;

    const forwardDepartureDate = new Date(item.flight.legs[0].segments[0].departureDate)
        .toLocaleDateString("ru-RU", {
            minute: "numeric",
            hour: "numeric",
            day: "numeric",
            weekday: "short",
            month: "short",
        })
        .split(",")
        .reverse();
    const forwardDepartureTime = forwardDepartureDate[0].trim();
    const forwardDepartureDay = forwardDepartureDate.slice(1, 3).join(" ").trim();

    const forwardArrivalDate = new Date(item.flight.legs[0].segments[forwardTransferAmount].arrivalDate)
        .toLocaleDateString("ru-RU", {
            minute: "numeric",
            hour: "numeric",
            day: "numeric",
            weekday: "short",
            month: "short",
        })
        .split(",")
        .reverse();
    const forwardArrivalTime = forwardArrivalDate[0].trim();
    const forwardArrivalDay = forwardArrivalDate.slice(1, 3).join(" ").trim();

    const backDepartureDate = new Date(item.flight.legs[1].segments[0].departureDate)
        .toLocaleDateString("ru-RU", {
            minute: "numeric",
            hour: "numeric",
            day: "numeric",
            weekday: "short",
            month: "short",
        })
        .split(",")
        .reverse();
    const backDepartureTime = backDepartureDate[0].trim();
    const backDepartureDay = backDepartureDate.slice(1, 3).join(" ").trim();

    const backArrivalDate = new Date(item.flight.legs[1].segments[backTransferAmount].arrivalDate)
        .toLocaleDateString("ru-RU", {
            minute: "numeric",
            hour: "numeric",
            day: "numeric",
            weekday: "short",
            month: "short",
        })
        .split(",")
        .reverse();
    const backArrivalTime = backArrivalDate[0].trim();
    const backArrivalDay = backArrivalDate.slice(1, 3).join(" ").trim();

    const totalDuration = item.flight.legs[0].duration + item.flight.legs[1].duration;

    const getHoursString = (minutes) => {
        const text = Math.floor(minutes / 60) + " ч " + minutes % 60 + " мин";
        return text;
    }

    const obj = {
        logo: item.flight.carrier.airlineCode,
        price: Number(item.flight.price.total.amount),
        totalDuration,
        carrier: item.flight.carrier.caption,
        forward: {
            duration: getHoursString(item.flight.legs[0].duration),
            departureCity: item.flight.legs[0].segments[0].departureCity.caption,
            departureAirport: item.flight.legs[0].segments[0].departureAirport.caption,
            departureAirportUid: item.flight.legs[0].segments[0].departureAirport.uid,
            departureDay: forwardDepartureDay,
            departureTime: forwardDepartureTime,
            arrivalCity: item.flight.legs[0].segments[forwardTransferAmount].arrivalCity?.caption,
            arrivalAirport: item.flight.legs[0].segments[forwardTransferAmount].arrivalAirport.caption,
            arrivalAirportUid: item.flight.legs[0].segments[forwardTransferAmount].arrivalAirport.uid,
            arrivalDay: forwardArrivalDay,
            arrivalTime: forwardArrivalTime,
            carrier: item.flight.legs[0].segments[0].airline.caption,
            transferAmount: forwardTransferAmount,
        },
        back: {
            duration: getHoursString(item.flight.legs[1].duration),
            departureCity: item.flight.legs[1].segments[0].departureCity?.caption,
            departureAirport: item.flight.legs[1].segments[0].departureAirport.caption,
            departureAirportUid: item.flight.legs[1].segments[0].departureAirport.uid,
            departureDay: backDepartureDay,
            departureTime: backDepartureTime,
            arrivalCity: item.flight.legs[1].segments[backTransferAmount].arrivalCity.caption,
            arrivalAirport: item.flight.legs[1].segments[backTransferAmount].arrivalAirport.caption,
            arrivalAirportUid: item.flight.legs[1].segments[backTransferAmount].arrivalAirport.uid,
            arrivalDay: backArrivalDay,
            arrivalTime: backArrivalTime,
            carrier: item.flight.legs[1].segments[0].airline.caption,
            transferAmount: backTransferAmount,
        }
    }

    return obj;
}

export const getMaxPrice = (array) => {
    let max = 0;
    for (let item of array) {
        if (item.price > max) {
            max = item.price;
        }
    }
    return max;
};

export const filterByPrice = (array, min, max) => {
    return array.filter(item => item.price >= min && item.price <= max);
};

export const filterByTransfer = (array, transfers) => {
    if (transfers.length === 2) {
        return array.filter(item => item.back.transferAmount + item.forward.transferAmount < 2);
    } else if (transfers.includes('withoutTransfer')) {
        return array.filter(item => item.back.transferAmount === 0 && item.forward.transferAmount === 0);
    } else if (transfers.includes('oneTransfer')) {
        return array.filter(item => item.back.transferAmount + item.forward.transferAmount === 1);
    }
    return array;
};

export const sortFlights = (array, sortValue) => {
    if (sortValue === 'priceIncrease') {
        return array.sort((a, b) => a.price - b.price);
    }
    if (sortValue === 'priceDecrease') {
        return array.sort((a, b) => b.price - a.price);
    }
    if (sortValue === 'flightTime') {
        return array.sort((a, b) => a.totalDuration - b.totalDuration);
    }
    return array;
};

export const getCarriers = (array) => {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        obj[array[i].carrier] =
            (array[i].price > obj[array[i].carrier] ? obj[array[i].carrier] : array[i].price) ||
            array[i].price;
    }
    return obj;
}


export const filterByCarrier = (array, carriers) => {
    return array.filter(item => carriers.includes(item.carrier));
}