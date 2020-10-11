import React from "react";
import classes from "./OfferDetailDescription.module.css";
import * as actionTypes from "../../../../store/actions/index";
import {connect} from "react-redux";
import OfferDetailHeader from "./../OfferDetailHeader/OfferDetailHeader";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {useTranslation} from 'react-i18next'


function OfferDetailDescription(props) {

    const {t, i18n} = useTranslation()

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


    let offerDetail = "";
    if (props.offer && props.currentView === "list")
        offerDetail = (
            <div className={classes.OfferDetailBody}>

                <p className={classes.OfferTitle}> {props.offer.title}</p>
                <p className={classes.OfferPrice}>{props.offer.price} {t('currency')} / {t('month')}</p>
                <ImageGallery items={images}/>

                <p>{props.offer.description}</p>

            </div>
        );


    return (
        <div className={classes.OfferDetailDescription}>
            <OfferDetailHeader/>
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
