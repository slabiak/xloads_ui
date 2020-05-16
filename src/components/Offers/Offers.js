import React from 'react';
import Offer from './Offer/Offer';


function Offers(props) {


    let offers = props.data.map(offer => 
        <li key={offer.id}><Offer data={offer}></Offer></li>
    )
    return (
    <div>
        <ul>
            {offers}
        </ul>
    </div>
    )
}

export default Offers;