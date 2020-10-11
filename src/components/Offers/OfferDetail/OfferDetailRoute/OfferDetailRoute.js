import React from "react";
import classes from "./OfferDetailRoute.module.css";
import * as actionTypes from "../../../../store/actions";
import {connect} from "react-redux";
import OfferDetailHeader from "../OfferDetailHeader/OfferDetailHeader";
import "react-image-gallery/styles/css/image-gallery.css";
import 'moment/locale/pl'
import {useTranslation} from "react-i18next";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Search from "../../../Search/Search";


function OfferDetailRoute(props) {

    const {t, i18n} = useTranslation()
    moment.locale('en');
    let mode = null;

    let onRecalculateRoutesHandler = (e) => {
        e.preventDefault();
        props.setCurrentRouteToFetch(0);
    }

    if (props.routeType === 'transit') {
        mode = t('by.transit');
    } else if (props.routeType === 'car') {
        mode = t('by.car');
    } else if (props.routeType === 'foot') {
        mode = t('by.foot');
    } else if (props.routeType === 'bike') {
        mode = t('by.bike');
    }
    let timeIcon = <svg className="bi bi-alarm-fill" width="0.8em" height="0.8em" viewBox="0 0 16 16"
                        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd"
              d="M5.5.5A.5.5 0 0 1 6 0h4a.5.5 0 0 1 0 1H9v1.07a7.002 7.002 0 0 1 3.537 12.26l.817.816a.5.5 0 0 1-.708.708l-.924-.925A6.967 6.967 0 0 1 8 16a6.967 6.967 0 0 1-3.722-1.07l-.924.924a.5.5 0 0 1-.708-.708l.817-.816A7.002 7.002 0 0 1 7 2.07V1H5.999a.5.5 0 0 1-.5-.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1zm-5 4a.5.5 0 0 0-1 0v3.882l-1.447 2.894a.5.5 0 1 0 .894.448l1.5-3A.5.5 0 0 0 8.5 9V5z"/>
    </svg>;
    let spinner = null;
    let routeInfo = null;
    let created = moment(props.offer.created).fromNow();
    if (props.offer.calculationRequired && props.offer && props.routingRequestState.loading) {
        spinner = <React.Fragment> <CircularProgress size={20}/> {t('route.calculation')}</React.Fragment>;
    } else if (!props.offer.calculationRequired && props.offer) {


        //  created.format('pl');

        let routes = props.offer.paths[0].sections.filter(f => f.transitLeg).map(o => o.route);

        let transitInfo = null;

        if (props.offer.paths[0].mode === 'transit') {
            transitInfo = (
                <React.Fragment>
                    <p>
                        t('lines'): {routes.toString()} <br/>
                        t('transfers'): {props.offer.paths[0].transfers}
                    </p>
                </React.Fragment>
            )
        } else {
            transitInfo = t('distance') + ': ' + Math.round((props.offer.paths[0].totalDistance / 1000) * 100) / 100 + ' km';
        }

        routeInfo =
            <React.Fragment>
                {timeIcon} {Math.round((props.offer.paths[0].totalTime / 60 * 100) / 100)} min {mode}<br/>
                {/* dystans:  {Math.round((props.offer.paths[0].totalDistance/1000) * 100) / 100 } km */}
                {transitInfo}

            </React.Fragment>
    } else {
        routeInfo = <React.Fragment>{t('route.calculation.error')} {props.routingRequestState.responseCode}<br/>
            <a href="" onClick={(e) => {
                onRecalculateRoutesHandler(e)
            }}>{t('try.again')}</a>
        </React.Fragment>
    }


    return (
        <div className={classes.OfferDetailRoute}>
            <OfferDetailHeader/>
            <div className={classes.OfferDetailBody}>
                <Search/>
                {spinner}
                {routeInfo}
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        offersRequestState: state.offers.offersRequestState,
        routeType: state.routeControls.currentRouteType,
        routingRequestState: state.offers.routingRequestState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeFetchSingleOfferRequest: (requestParams) => dispatch(actionTypes.makeFetchSingleOfferRequest(requestParams)),
        setCurrentRouteToFetch: (newRouteToFetch) => dispatch(actionTypes.setCurrentRouteToFetch(newRouteToFetch))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailRoute);
