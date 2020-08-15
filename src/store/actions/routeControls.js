import * as actionTypes from './actionTypes';

export const changeRouteType = (newRouteType) => {
    return {
        type: actionTypes.SET_ROUTE_TYPE,
        newRouteType: newRouteType
    }
};

