import React from "react";
import classes from "./OfferDetailPage.module.css";
import Header from "../../Header/Header";
import Search from "../../Search/Search";
import {connect} from "react-redux";
import OfferDetailDescription from "./OfferDetailDescription/OfferDetailDescription";
import OfferDetailRoute from "./OfferDetailRoute/OfferDetailRoute";
import OfferDetailMap from "./OfferDetailMap/OfferDetailMap";
import MapComp from "../../MapComp/MapComp";
import * as actionTypes from "../../../store/actions";
import CircularProgress from "@material-ui/core/CircularProgress";


function OfferDetailPage(props) {

    React.useEffect(() => {
        if (props.currentRouteToFetch >= 0) {
            let requestParams = {
                routeType: props.routeType,
                fromLat: props.offers[props.currentRouteToFetch].coordinates.lat,
                fromLng: props.offers[props.currentRouteToFetch].coordinates.lng,
                toLat: props.targetPlace.geometry.coordinates[1],
                toLng: props.targetPlace.geometry.coordinates[0]
            };

            if (props.offers[props.currentRouteToFetch].calculationRequired) {
                props.makeRouteRequest(requestParams);
            }
        }
    }, [props.currentRouteToFetch]);

    React.useEffect(() => {
        let offer = props.offers.filter((offer) => offer.id == props.match.params.id)[0];
        if (offer == null) {
            props.makeFetchSingleOfferRequest({offerId: props.match.params.id});
        }
    }, []);

    let offer = props.offers.filter((offer) => offer.id == props.match.params.id)[0];

    let containerStyle = null;
    let detail;

    if (offer != null) {
        if (props.currentView === "list") {
            containerStyle = classes.ContainerDescription;
            detail =
                <React.Fragment> <OfferDetailDescription currentView={props.currentView}
                                                         offer={offer}/>
                    <div className={classes.SearchWrapper}>
                        <div><Search></Search></div>
                    </div>
                    <MapComp view={props.currentView} offerDetailView={true} offerDetailId={props.match.params.id}
                             hooveredOffer={props.hooveredOffer}></MapComp>
                </React.Fragment>
        } else if (props.currentView === "route") {
            containerStyle = classes.ContainerRoute;
            detail = <OfferDetailRoute currentView={props.currentView} offer={offer}/>
        } else {
            containerStyle = classes.ContainerMap;
            detail = <OfferDetailMap currentView={props.currentView} offerId={props.match.params.id}/>
        }
    } else if (props.offersRequestState.loading) {
        detail = <CircularProgress/>
    } else {
        detail = "Error!";
    }

    return (
        <div className={containerStyle}>
            <Header/>
            {detail}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        offers: state.offers.offers,
        currentView: state.settings.currentView,
        currentRouteToFetch: state.offers.currentRouteToFetch,
        targetPlace: state.search.targetPlace,
        routeType: state.routeControls.currentRouteType,
        offersRequestState: state.offers.offersRequestState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeOffersPageRequest: (requestParams) => dispatch(actionTypes.makeOffersPageRequest(requestParams)),
        makeRouteRequest: (requestParams) => dispatch(actionTypes.makeRouteRequest(requestParams)),
        setCurrentRouteToFetch: (newRouteToFetch) => dispatch(actionTypes.setCurrentRouteToFetch(newRouteToFetch)),
        setHooveredOffer: (hooveredOffer) => dispatch(actionTypes.setHooveredOffer(hooveredOffer)),
        makeFetchSingleOfferRequest: (requestParams) => dispatch(actionTypes.makeFetchSingleOfferRequest(requestParams))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailPage);

