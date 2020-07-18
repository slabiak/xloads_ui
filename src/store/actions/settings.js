import * as actionTypes from './actionTypes';

export const updateSettings = (newSettings) => {
    return {
    type: actionTypes.UPDATE_SETTINGS,
    newSettings:newSettings
    }
};

