import React from "react";
import classes from "./OfferDetailDescription.module.css";
import * as actionTypes from "../../../../store/actions/index";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import OfferDetailHeader from "./../OfferDetailHeader/OfferDetailHeader";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


function OfferDetailDescription(props) {
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];

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

                <p className={classes.OfferTitle}> {offer.title}</p>
                <p className={classes.OfferPrice}>{offer.price} zł / miesiąc</p>
                <ImageGallery items={images}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailDescription);
