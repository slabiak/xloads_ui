import React from "react";
import classes from "./OfferDetails.module.css";
import Header from "../../Header/Header";
import MapComp from "../../MapComp/MapComp";
import Search from "../../Search/Search";
import {connect} from "react-redux";
import OfferDetail from "./OfferDetail/OfferDetail";


function OfferDetails(props) {
    let header = props.currentView === "list" ? <Header/> : null;
    let search = props.currentView === "list" ? <Search/> : null;

    return (
        <div className={props.currentView === "list" ? classes.Container : classes.ContainerMap}>
            {header}
            {search}
            <OfferDetail currentView={props.currentView} offerId={props.match.params.id}/>
            <MapComp view={props.currentView} offerDetailView={true} offerDetailId={props.match.params.id}
                     hooveredOffer={props.hooveredOffer}></MapComp>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        offers: state.offers.offers,
        currentView: state.settings.currentView
    };
};

export default connect(mapStateToProps)(OfferDetails);

