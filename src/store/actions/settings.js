import * as actionTypes from './actionTypes';

export const updateSettings = (newSettings) => {
    return {
        type: actionTypes.UPDATE_SETTINGS,
        newSettings: newSettings
    }
};

export const setCurrentView = (newView) => {
    return {
        type: actionTypes.SET_CURRENT_VIEW,
        newView: newView
    }
};
