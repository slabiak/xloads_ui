import React from "react";
import classes from "./OfferDetails.module.css";
import Header from "../../Header/Header";
import MapComp from "../../MapComp/MapComp";
import Search from "../../Search/Search";
import {connect} from "react-redux";
import OfferDetail from "./OfferDetail/OfferDetail";


function OfferDetails(props) {
    let header = <Header/>
    let search = props.currentView === "route" ? <Search/> : null;

    let containerStyle = null;
    if (props.currentView === "list") {
        containerStyle = classes.ContainerDescription;
    } else if (props.currentView === "route") {
        containerStyle = classes.ContainerRoute;
    } else {
        containerStyle = classes.ContainerMap;
    }

    return (
        <div className={containerStyle}>
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

