import { SET_MESSAGE, REMOVE_MESSAGE, GET_MESSAGE } from "../actions/types"

const initState = {
    content: "",
};

export default function (state = initState, action) {
    switch (action.type) {
        case GET_MESSAGE:
            return {
                ...state,
                content: action.message
            }
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