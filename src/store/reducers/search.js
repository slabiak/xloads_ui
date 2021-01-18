import * as actionTypes from '../actions/actionTypes';
import {calculateBoundingBox} from '../../util/LatLngUtil';

const initialState = {
    targetPlace: {
        geometry: {
            coordinates: [-122.43910317261, 37.7677247]
        },
        properties: {
            housenumber: "27",
            city: "San Francisco",
            street: "Park Hill Avenue",
            postcode: "94114"
        },
        autocomplete: false,
        error: false
    },
    openTooFarAwayModal: false,
    currentSearchRegion: {
        name: 'San Francisco',
        boundingBox: calculateBoundingBox([-122.43910317261, 37.7677247], 15)
    },

}

//wrocław
// const initialState = {
//     targetPlace: {
//         geometry: {
//             coordinates: [17.0323709, 51.1106956]
//         },
//         properties: {
//             housenumber: "",
//             city: "Wroclaw",
//             street: "Rynek",
//             postcode: "50-116"
//         },
//         autocomplete: false,
//         error: false
//     },
//     openTooFarAwayModal: false,
//     currentSearchRegion: {
//         name: 'Wrocław',
//         boundingBox: calculateBoundingBox([17.0323709, 51.1106956], 15)
//     },
//
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TARGET_PLACE:
            return {
                ...state,
                targetPlace: action.newTargetPlace
            }
        case actionTypes.OPEN_TOO_FAR_AWAY_MODAL:
            return {
                ...state,
                openTooFarAwayModal: true
            }
        case actionTypes.HIDE_TOO_FAR_AWAY_MODAL:
            return {
                ...state,
                openTooFarAwayModal: false
            }
        default:
            return state;
    }
}


export default reducer;