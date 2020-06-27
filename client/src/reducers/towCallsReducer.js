import { GET_TOW_CALLS, CREATE_TOW_CALL, END_TOW_CALL } from "../actions/types"

const initState = {
    calls: [],
};

export default function (state = initState, action) {
    switch (action.type) {
        case GET_TOW_CALLS:
            return {
                ...state,
                calls: action.calls
            }
        case CREATE_TOW_CALL:
            return {
                ...state,
            }
        case END_TOW_CALL:
            return {
                ...state,
            }
        default: return state;
    }
}