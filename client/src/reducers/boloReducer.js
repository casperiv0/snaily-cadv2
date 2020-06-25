import { GET_BOLOS, CREATE_BOLO, REMOVE_BOLO } from "../actions/types"

const initState = {
    items: [],
    item: {}
};

export default function (state = initState, action) {
    switch (action.type) {
        case GET_BOLOS:
            return {
                ...state,
                items: action.bolos
            }
        case CREATE_BOLO:
            return {
                ...state,
            }
        case REMOVE_BOLO:
            return {
                ...state,
            }
        default: return state;
    }
}