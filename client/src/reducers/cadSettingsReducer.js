import { GET_CAD_SETTINGS, UPDATE_CAD_SETTINGS } from "../actions/types"

const initState = {
    settings: {},
};

export default function (state = initState, action) {
    switch (action.type) {
        case GET_CAD_SETTINGS:
            return {
                ...state,
                settings: action.settings
            }
        case UPDATE_CAD_SETTINGS:
            return {
                ...state,
                settings: action.settings
            }
        default: return state;
    }
}