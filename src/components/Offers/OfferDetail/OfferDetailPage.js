import React from "react";
import classes from "./OfferDetailPage.module.css";
import Header from "../../Header/Header";
import Search from "../../Search/Search";
import {connect} from "react-redux";
import OfferDetailDescription from "./OfferDetailDescription/OfferDetailDescription";
import OfferDetailRoute from "./OfferDetailRoute/OfferDetailRoute";
import OfferDetailMap from "./OfferDetailMap/OfferDetailMap";


function OfferDetailPage(props) {
    let search = props.currentView === "route" ? <Search/> : null;

    let containerStyle = null;
    let detail = null;
    if (props.currentView === "list") {
        containerStyle = classes.ContainerDescription;
        detail = <OfferDetailDescription currentView={props.currentView} offerId={props.match.params.id}/>
    } else if (props.currentView === "route") {
        containerStyle = classes.ContainerRoute;
        detail = <OfferDetailRoute currentView={props.currentView} offerId={props.match.params.id}/>
    } else {
        containerStyle = classes.ContainerMap;
        detail = <OfferDetailMap currentView={props.currentView} offerId={props.match.params.id}/>
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
        currentView: state.settings.currentView
    };
};

export default connect(mapStateToProps)(OfferDetailPage);
