import React from 'react';
import Offer from './Offer/Offer';
import classes from './Offers.module.css';
import {Pagination} from 'react-bootstrap';
import OffersHeader from './OffersHeader/OffersHeader';
function Offers(props) {

    


    let offers = null;
    
    if(props.currentView ==='list') {
        offers = props.data.map(offer => 
       <Offer mode={props.mode} key={offer.id} onMouseLeaveHandler={props.onMouseLeaveHandler} onMouseOverOfferHandler={props.onMouseOverOfferHandler} data={offer}></Offer>
    )
        }


    return (
        <div className={classes.Offers}>
        <OffersHeader numberOfOffers={props.numberOfOffers} currentView = {props.currentView} onChangeViewHandler={props.onChangeViewHandler}/>
        <ul className={classes.OffersItems}> 
            {offers}
        </ul>

    </div>
    )
}

export default Offers;