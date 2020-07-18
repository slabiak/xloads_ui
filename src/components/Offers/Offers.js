import React from 'react';
import Offer from './Offer/Offer';
import classes from './Offers.module.css';
import {Pagination} from 'react-bootstrap';
import OffersHeader from './OffersHeader/OffersHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button} from '@material-ui/core';
import {Switch, Route, Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';

function Offers(props) {

    let spinner = null;
    let offers = null;
    let offersHeader =null;
    if(props.currentView ==='list') {
        offers = props.data2.map(offer => 
      <Link to={"/offers/"+ offer.id}><Offer onRecalculateRoutesHandler={props.onRecalculateRoutesHandler} routingRequestState={props.routingRequestState} mode={props.mode} key={offer.id} onMouseLeaveHandler={props.onMouseLeaveHandler} onMouseOverOfferHandler={props.onMouseOverOfferHandler} data={offer}></Offer></Link> 
    )
        }

        if(props.offersRequestState2.loading){
            offers = null;
            offersHeader = null;
            spinner = <div className={classes.SpinnerWrapper}><CircularProgress size={30}></CircularProgress></div>
        } else if(!props.offersRequestState2.loading && props.offersRequestState2.responseCode===200) {
            offersHeader = <OffersHeader numberOfOffers={props.numberOfOffers} currentView = {props.currentView} onChangeViewHandler={props.onChangeViewHandler}/>;
            offers= (<div className={classes.UlWrapper}><ul className={classes.OffersItems}> 
                      {offers}
                    </ul>
                    </div>)
            spinner = null;
        } else {
            spinner = <div className={classes.SpinnerWrapper}><p>Błąd {props.offersRequestState.responseCode}</p> <Button onClick={()=>props.onRetryButtonClicked()} variant="contained">Spróbuj ponownie</Button>            </div>;
        }


 


    return (
        <div className={classes.Offers}>
        {offersHeader}
        {spinner}
        {offers}
    </div>
    )
}

const mapStateToProps = state => {
    return {
      data2: state.offers.offers,
      offersRequestState2: state.offers.offersRequestState
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    //   onChangeRouteType: (newRouteType)=> dispatch(actionTypes.changeRouteType(newRouteType))
    };
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Offers);