import React from 'react';
import Offer from './Offer/Offer';
import classes from './Offers.module.css';
import {Pagination} from 'react-bootstrap';

function Offers(props) {

    


    let offers = props.data.map(offer => 
       <Offer mode={props.mode} key={offer.id} onMouseLeaveHandler={props.onMouseLeaveHandler} onMouseOverOfferHandler={props.onMouseOverOfferHandler} data={offer}></Offer>
    )
    return (
        <div className={classes.Offers}>
        <div className={classes.OffersHeader}>Znaleziono: 405</div>
        <ul className={classes.OffersItems}> 
            {offers}
        </ul>

    </div>
    )
}

export default Offers;