import * as actionTypes from './actionTypes';

export const setTargetPlace = (newTargetPlace) => {
    return {
        type: actionTypes.SET_TARGET_PLACE,
        newTargetPlace: newTargetPlace,
    }
};


export const openTooFarAwayModal = () => {
    return {
        type: actionTypes.OPEN_TOO_FAR_AWAY_MODAL
    }
};

export const hideTooFarAwayModal = () => {
    return {
        type: actionTypes.HIDE_TOO_FAR_AWAY_MODAL
    }
};

