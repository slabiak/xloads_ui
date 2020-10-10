import React from "react";
import classes from "./OfferDetailRoute.module.css";
import * as actionTypes from "../../../../store/actions";
import {connect} from "react-redux";
import OfferDetailHeader from "../OfferDetailHeader/OfferDetailHeader";
import "react-image-gallery/styles/css/image-gallery.css";
import RouteControls from "../../../RouteControls/RouteControls";


function OfferDetailRoute(props) {

    return (
        <div className={classes.OfferDetailRoute}>
            <OfferDetailHeader/>
            <div className={classes.OfferDetailBody}>
                <RouteControls/>
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailRoute);
