import React from "react";
import {connect} from "react-redux";
import classes from "./OfferDetails.module.css";
import Header from "../../Header/Header";
import MapComp from "../../MapComp/MapComp";
import Search from "../../Search/Search";
import OffersHeader from "../../Offers/OffersHeader/OffersHeader";
import * as actionTypes from "../../../store/actions/index";

function OfferDetails(props) {

    React.useEffect(() => {
        let offer = props.offers.filter(
            (offer) => offer.id == props.match.params.id
        )[0];
        if (offer == null) {
            props.makeFetchSingleOfferRequest({offerId: props.match.params.id});

        }
    }, []);


    let offer = props.offers.filter(
        (offer) => offer.id == props.match.params.id
    )[0];
    let header = props.currentView === "list" ? <Header/> : null;
    let offersHeader = null;
    let homePage = null;
    if (offer != null) {

        offersHeader = (
            <OffersHeader
                numberOfOffers={props.numberOfOffers}
            />
        );

        let search = props.currentView === "list" ? <Search></Search> : null;
        let map = (
            <MapComp offerDetailView={true} offerDetailId={props.match.params.id}
                     hooveredOffer={props.hooveredOffer}></MapComp>
        );

        // let offerDetail = props.currentView === "list" ? <p>{offer.title}</p> : null;

        homePage = (
            <React.Fragment>
                {search}
                {map}
            </React.Fragment>
        );
    } else {
    }

    return (

        <div
            className={
                props.currentView === "list" ? classes.Container : classes.ContainerMap
            }
        >
            {header}

            <div className={classes.OfferDetail}>
                {offersHeader}
                {/*{offerDetail}*/}
            </div>
            {homePage}
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        offers: state.offers.offers,
        currentView: state.settings.currentView
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeFetchSingleOfferRequest: (requestParams) => dispatch(actionTypes.makeFetchSingleOfferRequest(requestParams))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
