import { GET_911_CALLS, CREATE_911_CALL, END_911_CALL } from "../actions/types"

const initState = {
    calls: [],
};

export default function (state = initState, action) {
    switch (action.type) {
        case GET_911_CALLS:
            return {
                ...state,
                calls: action.calls
            }
        case CREATE_911_CALL:
            return {
                ...state,
            }
        case END_911_CALL:
            return {
                ...state,
            }
        default: return state;
    }
}