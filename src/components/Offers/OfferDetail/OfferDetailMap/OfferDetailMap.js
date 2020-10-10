import React from "react";
import classes from "./OfferDetailMap.module.css";
import * as actionTypes from "../../../../store/actions";
import {connect} from "react-redux";
import OfferDetailHeader from "../OfferDetailHeader/OfferDetailHeader";
import "react-image-gallery/styles/css/image-gallery.css";
import MapComp from "../../../MapComp/MapComp";

function OfferDetailMap(props) {


    return (
        <React.Fragment>
            <div className={classes.OfferDetailMap}>
                <OfferDetailHeader/>
            </div>
            <MapComp view={props.currentView} offerDetailView={true} offerDetailId={props.offerId}
                     hooveredOffer={props.hooveredOffer}></MapComp>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        offersRequestState: state.offers.offersRequestState,
        offers: state.offers.offers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        makeFetchSingleOfferRequest: (requestParams) => dispatch(actionTypes.makeFetchSingleOfferRequest(requestParams))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailMap);
