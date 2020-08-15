import * as actionTypes from '../actions/actionTypes';

const initialState = {
    category: '1',
    sortBy: 'created.desc',
    priceFrom: '',
    priceTo: '',
    currentView: 'list'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_SETTINGS:
            return {
                ...action.newSettings
            }
        case actionTypes.SET_CURRENT_VIEW:
        return {
            ...state,
            currentView: action.newView
        }
        default:
            return state;
    }
}


export default reducer;