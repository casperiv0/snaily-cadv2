import { CREATE_WARRANT } from "../actions/types"

const initState = {
    warrants: "",
};

export default function (state = initState, action) {
    switch (action.type) {
        case CREATE_WARRANT:
            return {
                ...state,
            }
        default: return state;
    }
}