import React from 'react';
import classes from './OffersHeader.module.css';

function OffersHeader(props) {

    return (
        <div className={classes.OffersHeader}>
            <div>Znaleziono: {props.numberOfOffers}</div>
            <div className={classes.ListTypeContainer}>
                <ul className={classes.ListType}>
                <li className={props.currentView==='map'? classes.active:''}><a href="" onClick={(e)=> props.onChangeViewHandler(e,'map')}>Mapa</a></li>
                <li className={props.currentView=='list'? classes.active:''}><a href="#" onClick={(e)=> props.onChangeViewHandler(e,'list')}>Lista</a></li>
                </ul>
                </div>
                </div>
    )
}

export default OffersHeader;