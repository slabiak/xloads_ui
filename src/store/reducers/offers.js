import * as actionTypes from '../actions/actionTypes';

const initialState = {
    offersRequestState: {
        loading: false,
        responseCode: 0
    },
    routingRequestState: {
        loading: false,
        responseCode: 0
    },
    offers: [],
    currentRouteToFetch: -1,
    totalPages: 0,
    currentPage: 1,
    numberOfOffers: 0,
    hooveredOffer: {
        state: false,
        offerId: undefined
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_HOOVERED_OFFER :
            return {
                ...state,
                hooveredOffer: {
                    state: action.hooveredOffer.state,
                    offerId: action.hooveredOffer.offerId,
                }
            }


        case actionTypes.SET_ROUTES_LOADING :
            return {
                ...state,
                routingRequestState: {
                    ...state.routingRequestState.responseCode,
                    loading: action.loading,
                }
            }

        case actionTypes.SET_CURRENT_ROUTE_TO_FETCH:
            return {
                ...state,
                currentRouteToFetch: action.newCurrentRouteToFetch
            }

        case actionTypes.ON_FAILED_ROUTE_REQUEST:

            return {
                ...state,
                routingRequestState: {
                    loading: false,
                    responseCode: action.responseCode
                },
                currentRouteToFetch: -1
            }

        case actionTypes.ON_SUCCESSFUL_ROUTE_REQUEST:

            let id = state.offers[state.currentRouteToFetch].id;
            let updatedOffers = state.offers.map(offer => {
                if (offer.id === id) {
                    return {
                        ...offer,
                        paths: action.fetchedPaths.fetchedPaths,
                        calculationRequired: false
                    }
                }
                return offer;
            })

            let newCurrentRouteToFetch = state.currentRouteToFetch < state.offers.length - 1 ? state.currentRouteToFetch + 1 : -1;

            return {
                ...state,
                offers: updatedOffers,
                currentRouteToFetch: newCurrentRouteToFetch,
                routingRequestState: {
                    loading: false,
                    responseCode: action.responseCode
                },
            }


        case actionTypes.CLEAR_OFFERS_ROUTES:


            let offersWithClearedRoutes = state.offers.map(offer => {
                var temp = Object.assign({}, offer);
                temp.calculationRequired = true;
                temp.paths = null;
                return temp;
            });

            return {
                ...state,
                offers: offersWithClearedRoutes,
                currentRouteToFetch: state.offers.length > 0 ? 0 : -1,
            }
        case actionTypes.SET_OFFERS:
            return {
                ...state,
                offers: action.offers
            }
        case actionTypes.SET_OFFERS_LOADING:
            return {
                ...state,
                offersRequestState: {
                    ...state.offersRequestState,
                    loading: action.loading
                }
            }
        case actionTypes.ON_SUCCESSFUL_OFFERS_PAGE_REQUEST:
            return {
                ...state,
                offersRequestState: action.data.offersRequestState,
                offers: action.data.offers,
                currentRouteToFetch: action.data.currentRouteToFetch,
                totalPages: action.data.totalPages,
                currentPage: action.data.currentPage,
                numberOfOffers: action.data.numberOfOffers
            }
        case actionTypes.ON_SUCCESSFUL_OFFER_PAGE_REQUEST:
            return {
                ...state,
                offersRequestState: action.data.offersRequestState,
                offers: action.data.offers,
                currentRouteToFetch: action.data.currentRouteToFetch,
                totalPages: action.data.totalPages,
                currentPage: action.data.currentPage,
                numberOfOffers: action.data.numberOfOffers
            }
        case actionTypes.ON_FAILED_OFFERS_PAGE_REQUEST:
            return {
                ...state,
                offersRequestState: action.data.offersRequestState,
            }
        default:
            return state;
    }
}


export default reducer;