import { SET_MESSAGE, REMOVE_MESSAGE } from "../actions/types"

const initState = {
    content: "",
};

export default function (state = initState, action) {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                content: action.newMessage
            }
        case REMOVE_MESSAGE:
            return {
                ...state,
                content: "",
            }
        default: return state;
    }
}