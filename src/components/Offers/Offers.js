import React from 'react';
import Offer from './Offer/Offer';
import classes from './Offers.module.css';
import OffersHeader from './OffersHeader/OffersHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Button} from '@material-ui/core';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/index';

function Offers(props) {

    React.useEffect(() => {
        if (props.currentRouteToFetch >= 0) {
            let requestParams = {
                routeType: props.routeType,
                fromLat: props.data2[props.currentRouteToFetch].coordinates.lat,
                fromLng: props.data2[props.currentRouteToFetch].coordinates.lng,
                toLat: props.targetPlace.geometry.coordinates[1],
                toLng: props.targetPlace.geometry.coordinates[0]
            }
            props.makeRouteRequest(requestParams);
        }
    }, [props.currentRouteToFetch]);

    let retryToLoadOffersButtonClicked = () => {
        let requestParams = {
            category: this.props.category,
            priceGte: this.props.priceFrom,
            priceLte: this.props.priceTo,
            sortBy: this.props.sortBy,
            pageNumber: this.state.currentPage - 1,
            limit: 5
        }
        this.props.makeOffersPageRequest(requestParams);
    }

    let onRecalculateRoutesHandler = (e) => {
        e.preventDefault();
        props.setCurrentRouteToFetch(0);
    }

    let onMouseOverOfferHandler = (id) => {
        props.setHooveredOffer({
            state: true,
            offerId: id
        });
    }

    let onMouseLeaveHandler = () => {
        props.setHooveredOffer({
            state: false,
            offerId: undefined
        });
    }


    let spinner = null;
    let offers = null;
    let offersHeader = null;
    if (props.currentView === 'list') {
        offers = props.data2.map(offer =>
            <Link to={"/offers/" + offer.id}><Offer onRecalculateRoutesHandler={onRecalculateRoutesHandler}
                                                    routingRequestState={props.routingRequestState}
                                                    mode={props.routeType} key={offer.id}
                                                    onMouseLeaveHandler={onMouseLeaveHandler}
                                                    onMouseOverOfferHandler={onMouseOverOfferHandler}
                                                    data={offer}></Offer></Link>
        )
    }

    if (props.offersRequestState2.loading) {
        offers = null;
        offersHeader = null;
        spinner = <div className={classes.SpinnerWrapper}><CircularProgress size={30}></CircularProgress></div>
    } else if (!props.offersRequestState2.loading && props.offersRequestState2.responseCode === 200) {
        offersHeader = <OffersHeader numberOfOffers={props.numberOfOffers}/>;
        offers = (<div className={classes.UlWrapper}>
            <ul className={classes.OffersItems}>
                {offers}
            </ul>
        </div>)
        spinner = null;
    } else {
        spinner = <div className={classes.SpinnerWrapper}><p>Błąd {props.offersRequestState2.responseCode}</p> <Button
            onClick={() => retryToLoadOffersButtonClicked()} variant="contained">Spróbuj ponownie</Button></div>;
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
        offersRequestState2: state.offers.offersRequestState,
        currentRouteToFetch: state.offers.currentRouteToFetch,
        routingRequestState: state.offers.routingRequestState,
        targetPlace: state.search.targetPlace,
        routeType: state.routeControls.currentRouteType,
        numberOfOffers: state.offers.numberOfOffers,
        currentView: state.settings.currentView
    };
}

const mapDispatchToProps = dispatch => {
    return {
        makeOffersPageRequest: (requestParams) => dispatch(actionTypes.makeOffersPageRequest(requestParams)),
        makeRouteRequest: (requestParams) => dispatch(actionTypes.makeRouteRequest(requestParams)),
        setCurrentRouteToFetch: (newRouteToFetch) => dispatch(actionTypes.setCurrentRouteToFetch(newRouteToFetch)),
        setHooveredOffer: (hooveredOffer) => dispatch(actionTypes.setHooveredOffer(hooveredOffer))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Offers);