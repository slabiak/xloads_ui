import * as actionTypes from '../actions/actionTypes';

const initialState = {
    category: '1',
    sortBy: 'created.desc',
    priceFrom: '',
    priceTo: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_SETTINGS:
            return {
                ...action.newSettings
            }
        default:
            return state;
    }
}


export default reducer;