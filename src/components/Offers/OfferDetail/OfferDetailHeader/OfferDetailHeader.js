import React from 'react';
import classes from './OfferDetailHeader.module.css';
import {connect} from "react-redux";
import * as actionTypes from "../../../../store/actions/index";
import {useTranslation} from 'react-i18next'

function OfferDetailHeader(props) {

    const {t, i18n} = useTranslation()

    const onChangeViewHandler = (e, newView) => {
        e.preventDefault();
        props.setCurrentView(newView);
    };

    return (
        <div className={classes.OffersHeader}>
            <div className={classes.ListTypeContainer}>
                <ul className={classes.ListType}>
                    <li className={props.currentView === 'map' ? classes.active : ''}><a href=""
                                                                                         onClick={(e) => onChangeViewHandler(e, 'map')}>{t('map')}</a>
                    </li>
                    <li className={props.currentView === 'route' ? classes.active : ''}><a href=""
                                                                                           onClick={(e) => onChangeViewHandler(e, 'route')}>{t('route')}</a>
                    </li>
                    <li className={props.currentView == 'list' ? classes.active : ''}><a href="#"
                                                                                         onClick={(e) => onChangeViewHandler(e, 'list')}>{t('description')}</a>
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