import { GET_ACTIVE_UNITS } from "../actions/types"

const initState = {
    activeEmsFd: [],
    activeOfficers: []
};

export default function (state = initState, action) {
    switch (action.type) {
        case GET_ACTIVE_UNITS:
            return {
                ...state,
                activeEmsFd: action.emsFd,
                activeOfficers: action.officers
            }
        default: return state;
    }
}