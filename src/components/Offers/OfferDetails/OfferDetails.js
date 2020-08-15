import React from "react";
import {connect} from "react-redux";
import classes from "./OfferDetails.module.css";
import Header from "../../Header/Header";
import MapComp from "../../MapComp/MapComp";
import Search from "../../Search/Search";
import OffersHeader from "../../Offers/OffersHeader/OffersHeader";

function OfferDetails(props) {
    let offer = props.offers.filter(
        (offer) => offer.id == props.match.params.id
    )[0];
    let header = props.currentView === "list" ? <Header/> : null;
    let offerPresent = null;
    if (offer != null) {
        let offersHeader = (
            <OffersHeader
                numberOfOffers={props.numberOfOffers}
            />
        );

        let search = props.currentView === "list" ? <Search></Search> : null;
        let map = (
            <MapComp view={props.currentView} hooveredOffer={props.hooveredOffer}></MapComp>
        );

        let offerDetail = props.currentView === "list" ? <p>{offer.title}</p> : null;

        let homePage = (
            <React.Fragment>
                {search}
                {map}
            </React.Fragment>
        );

        offerPresent = (
            <div
                className={
                    props.currentView === "list" ? classes.Container : classes.ContainerMap
                }
            >
                {header}

                <div className={classes.OfferDetail}>
                    {offersHeader}
                    {offerDetail}
                </div>
                {homePage}
            </div>
        );
    } else {
        offerPresent = (
            <div
                className={
                    props.currentView === "list" ? classes.Container : classes.ContainerMap
                }
            >
                {header}
            </div>
        );
    }

    return offerPresent;
}

const mapStateToProps = (state) => {
    return {
        offers: state.offers.offers,
        routingRequestState: state.offers.routingRequestState,
        targetPlace: state.search.targetPlace,
        routeType: state.routeControls.currentRouteType,
        currentView: state.settings.currentView
    };
};

export default connect(mapStateToProps)(OfferDetails);
