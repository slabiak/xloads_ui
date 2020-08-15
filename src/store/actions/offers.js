import * as actionTypes from './actionTypes';
import config from '../../config';
import axios from 'axios';

export const setCurrentRouteToFetch = (newRouteToFetch) => {
    return {
        type: actionTypes.SET_CURRENT_ROUTE_TO_FETCH,
        newCurrentRouteToFetch: newRouteToFetch
    }
}

export const setHooveredOffer = (hooveredOffer) => {
    return {
        type: actionTypes.SET_HOOVERED_OFFER,
        hooveredOffer: hooveredOffer
    }
}


export const onSuccessfulRouteRequest = (fetchedPaths) => {
    return {
        type: actionTypes.ON_SUCCESSFUL_ROUTE_REQUEST,
        fetchedPaths: fetchedPaths
    }
};

export const onFailedRouteRequest = (responseCode) => {
    return {
        type: actionTypes.ON_FAILED_ROUTE_REQUEST,
        responseCode: responseCode
    }
}

export const setRoute = (data) => {
    return {
        type: actionTypes.SET_ROUTE,
        data: data
    }
}

export const setRoutesLoading = (loading) => {
    return {
        type: actionTypes.SET_ROUTES_LOADING,
        loading: loading
    }
}

export const makeRouteRequest = (requestParams) => {
    return dispatch => {
        dispatch(setRoutesLoading(true));
        let apiUrl = `${config.MAP_API_PREFIX}/api/route/${requestParams.routeType}?fromLat=${requestParams.fromLat}&fromLng=${requestParams.fromLng}&toLat=${requestParams.toLat}&toLng=${requestParams.toLng}&depTime=2020-05-23T10:15:30`;
        axios.get(apiUrl, {timeout: config.MAP_API_TIMEOUT})
            .then(res => {
                dispatch(onSuccessfulRouteRequest({fetchedPaths: res.data, responseCode: res.status}));
            })
            .catch(e => {
                if (e.response) {
                    dispatch(onFailedRouteRequest(e.response.status));
                } else if (e.request) {
                    dispatch(onFailedRouteRequest(1001));
                }
            });

    }
}


export const clearOffersRoutes = () => {
    return {
        type: actionTypes.CLEAR_OFFERS_ROUTES
    }
}

export const onSuccessfulOffersPageRequest = (data) => {
    return {
        type: actionTypes.ON_SUCCESSFUL_OFFERS_PAGE_REQUEST,
        data: data
    }
};

export const onFailedOffersPageRequest = (data) => {
    return {
        type: actionTypes.ON_FAILED_OFFERS_PAGE_REQUEST,
        data: data
    }
}

export const setOffersLoading = (loading) => {
    return {
        type: actionTypes.SET_OFFERS_LOADING,
        loading: loading
    }
}

export const setOffers = (offers) => {
    return {
        type: actionTypes.SET_OFFERS,
        offers: offers
    }
}


export const makeOffersPageRequest = (requestParams) => {
    return dispatch => {
        dispatch(setOffersLoading(true));
        dispatch(setOffers([]));

        let gte = requestParams.priceGte != '' ? requestParams.priceGte : 0;
        let lte = requestParams.priceLte != '' ? requestParams.priceLte : 10000;

        let apiUrl = `${config.OFFERS_API_PREFIX}/api/offer/category/${requestParams.category}/page?limit=${requestParams.limit}&page=${requestParams.pageNumber}&price_gte=${gte}&price_lte=${lte}&sort_by=${requestParams.sortBy}`;
        axios.get(apiUrl, {timeout: config.OFFERS_API_TIMEOUT})
            .then(res => {
                let fetchedOffers = res.data.content.map(offer => {
                    let o = {
                        ...offer,
                        calculationRequired: true
                    }
                    return o;
                })
                window.scrollTo(0, 0)

                dispatch(onSuccessfulOffersPageRequest({
                    offers: fetchedOffers,
                    currentRouteToFetch: fetchedOffers.length > 0 ? 0 : -1,
                    offersRequestState: {loading: false, responseCode: res.status},
                    totalPages: res.data.totalPages,
                    currentPage: res.data.number + 1,
                    numberOfOffers: res.data.totalElements
                }));
            }).catch(e => {
            if (e.response) {
                dispatch(onFailedOffersPageRequest({
                    offersRequestState: {
                        loading: false,
                        responseCode: e.response.status
                    }
                }));

            } else if (e.request) {
                dispatch(onFailedOffersPageRequest({offersRequestState: {loading: false, responseCode: 1001}}));

            }
        });
    }
}
