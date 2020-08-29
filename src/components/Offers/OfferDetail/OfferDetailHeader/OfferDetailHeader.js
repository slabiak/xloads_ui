import React from 'react';
import classes from './OfferDetailHeader.module.css';
import {connect} from "react-redux";
import * as actionTypes from "../../../../store/actions/index";

function OfferDetailHeader(props) {

    const onChangeViewHandler = (e, newView) => {
        e.preventDefault();
        props.setCurrentView(newView);
    };

    return (
        <div className={classes.OffersHeader}>
            <div className={classes.ListTypeContainer}>
                <ul className={classes.ListType}>
                    <li className={props.currentView === 'map' ? classes.active : ''}><a href=""
                                                                                         onClick={(e) => onChangeViewHandler(e, 'map')}>Mapa</a>
                    </li>
                    <li className={props.currentView === 'route' ? classes.active : ''}><a href=""
                                                                                           onClick={(e) => onChangeViewHandler(e, 'route')}>Trasa</a>
                    </li>
                    <li className={props.currentView == 'list' ? classes.active : ''}><a href="#"
                                                                                         onClick={(e) => onChangeViewHandler(e, 'list')}>Opis</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        routeType: state.routeControls.currentRouteType,
        currentView: state.settings.currentView
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentView: (newView) => dispatch(actionTypes.setCurrentView(newView))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailHeader);