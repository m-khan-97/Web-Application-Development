import { useEffect, useState } from "react";

interface SpecialOffer {
    id: number;
    details: string;
    startDate: string;
    endDate: string;
}

export default function SpecialOffers() {
    const [specialOffers, setSpecialOffers] = useState<SpecialOffer[]>([]);

    useEffect(() => {
        fetch("/specialoffers/all")
        .then((response) => response.json())
        .then((json) => setSpecialOffers(json));
    }, []);


    const offersOut = specialOffers.map((offer) => (
        <p key={offer.id}>
            {offer.details}, Valid from {offer.startDate} till {offer.endDate}
        </p>
    ));

    return (
        <div>
            <h2>Special Offers</h2>
            {offersOut}
        </div>
    );
}