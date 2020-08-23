import React from "react";
import classes from "./OfferDetail.module.css";
import * as actionTypes from "../../../../store/actions";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import OfferDetailHeader from "./OfferDetailHeader/OfferDetailHeader";


function OfferDetail(props) {

    React.useEffect(() => {
        let offer = props.offers.filter((offer) => offer.id == props.offerid)[0];
        if (offer == null) {
            props.makeFetchSingleOfferRequest({offerId: props.offerId});
        }
    }, []);

    let offer = props.offers.filter((offer) => offer.id == props.offerId)[0];
    let offerDetail = "";
    if (offer != null) {
        offerDetail = (
            <div className={classes.OfferDetailBody}>
                <p>{offer.title}</p>
                <p>{offer.description}</p>
            </div>
        )
    } else if (props.offersRequestState.loading) {
        offerDetail = <CircularProgress/>;
    } else {
        offerDetail = "Error!";
    }

    offerDetail = props.currentView === "list" ? offerDetail : null;

    return (
        <div className={classes.OfferDetailContainer}>
            <OfferDetailHeader offerId={props.offerId}/>
            {offerDetail}
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

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetail);
