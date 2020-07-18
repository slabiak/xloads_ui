import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentRouteType : 'foot'
}

const reducer = (state = initialState, action) => {
    switch( action.type){
        case actionTypes.SET_ROUTE_TYPE:
            return {
                ...state,
                currentRouteType : action.newRouteType
            }
        default:  
            return state;
    }  
}


export default reducer;