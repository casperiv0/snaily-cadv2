import { DELETE_CITIZEN_BY_ID, GET_CITIZENS_BY_ACC, GET_CITIZENS_BY_ID, GET_ALL_CITIZENS } from "../actions/types"

const initState = {
    citizens: [],
    citizen: {},
};

export default function (state = initState, action) {
    switch (action.type) {
        case GET_CITIZENS_BY_ID:
            return {
                ...state,
                citizen: action.citizen
            }
        case GET_CITIZENS_BY_ACC:
            return {
                ...state,
                citizens: action.citizens
            }
        case DELETE_CITIZEN_BY_ID:
            return {
                ...state,
                citizen: null,
                citizens: null,
            }
        case GET_ALL_CITIZENS:
            return {
                ...state,
                citizens: action.citizens
            }
        default: return state;
    }
}