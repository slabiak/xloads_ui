import * as actionTypes from '../actions/actionTypes';
import {calculateBoundingBox, isWithinBoundingBox} from '../../util/LatLngUtil';

const initialState = {
    targetPlace: {
        geometry: {
            coordinates: [17.0323709, 51.1106956]
        },
        properties:{
            housenumber: "",
            city: "Wroclaw",
            street: "Rynek",
            postcode: "50-116"
        },
        autocomplete: false,
        error : false
    },
    openTooFarAwayModal : false,
    currentSearchRegion : {
        name:'Wrocław', 
        boundingBox: calculateBoundingBox([17.0323709,51.1106956],15)
    },

}

const reducer = (state = initialState, action) => {
    switch( action.type){
        case actionTypes.SET_TARGET_PLACE:
            return {
                ...state,
                targetPlace : action.newTargetPlace
            }
            case actionTypes.OPEN_TOO_FAR_AWAY_MODAL:
            return {
                ...state,
                openTooFarAwayModal : true
            }
            case actionTypes.HIDE_TOO_FAR_AWAY_MODAL:
                return {
                    ...state,
                    openTooFarAwayModal : false
                }
        default:  
            return state;
    }  
}


export default reducer;