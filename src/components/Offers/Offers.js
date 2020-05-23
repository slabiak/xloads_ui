import React from 'react';
import Offer from './Offer/Offer';
import classes from './Offers.module.css'


function Offers(props) {

    


    let offers = props.data.map(offer => 
       <Offer key={offer.id} onMouseLeaveHandler={props.onMouseLeaveHandler} onMouseOverOfferHandler={props.onMouseOverOfferHandler} data={offer}></Offer>
    )
    return (
    <div>
        <ul className={classes.OffersItems}> 
            {offers}
        </ul>
    </div>
    )
}

export default Offers;