import React from 'react';
import classes from './OffersHeader.module.css';
import {connect} from "react-redux";
import * as actionTypes from "../../../store/actions/index";
import {useTranslation} from 'react-i18next'

function OffersHeader(props) {

    const {t, i18n} = useTranslation()

    const onChangeViewHandler = (e, newView) => {
        e.preventDefault();
        props.setCurrentView(newView);
    };


    return (
        <div className={classes.OffersHeader}>
            <div>{t('found.label')}: {props.numberOfOffers}</div>
            <div className={classes.ListTypeContainer}>
                <ul className={classes.ListType}>
                    <li className={props.currentView === 'map' ? classes.active : ''}><a href=""
                                                                                         onClick={(e) => onChangeViewHandler(e, 'map')}>Mapa</a>
                    </li>
                    <li className={props.currentView == 'list' ? classes.active : ''}><a href="#"
                                                                                         onClick={(e) => onChangeViewHandler(e, 'list')}>Lista</a>
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



export default  connect(mapStateToProps, mapDispatchToProps)(OffersHeader);