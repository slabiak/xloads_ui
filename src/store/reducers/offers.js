
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    offersRequestState: {
        loading: true,
        responseCode: 0
    },
    offers : [],
    currentRouteToFetch:-1,
    totalPages:0,
    currentPage: 1,
    numberOfOffers: 0
}

const reducer = (state = initialState, action) => {
    switch( action.type){
        case actionTypes.SET_OFFERS:
            return {
                ...state,
                offers: action.offers
            }
        case actionTypes.SET_OFFERS_LOADING:
            return {
                ...state,
                offersRequestState : {
                    ...state.offersRequestState,
                    loading: action.loading
                }
            }
        case actionTypes.ON_SUCCESSFUL_OFFERS_PAGE_REQUEST:
            return {
                ...state,
                offersRequestState : action.data.offersRequestState,
                offers: action.data.offers,
                currentRouteToFetch : action.data.currentRouteToFetch,
                totalPages : action.data.totalPages,
                currentPage : action.data.currentPage,
                numberOfOffers : action.data.numberOfOffers
            }
        case actionTypes.ON_FAILED_OFFERS_PAGE_REQUEST:
            return {
                ...state,
                offersRequestState : action.data.offersRequestState,
            }
        default:  
            return state;
    }  
}


export default reducer;