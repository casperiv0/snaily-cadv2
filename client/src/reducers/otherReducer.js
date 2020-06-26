import { UPDATE_AOP, PANIC_START, GET_AOP } from "../actions/types"

const initState = {
    aop: "",
};

export default function (state = initState, action) {
    switch (action.type) {
        case UPDATE_AOP:
            return {
                ...state,
                aop: action.newAop
            }
        case GET_AOP:
            return {
                ...state,
                aop: action.aop
            }
        case PANIC_START:
            return {
                ...state,
            }
        default: return state;
    }
}