import { EMS_SET_STATUS, EMS_SET_ON_DUTY, EMS_GET_STATUS, EMS_SET_OFF_DUTY } from "../actions/types"

const initState = {
    status: "", // On-off duty
    status2: "", // 10-11, 10-7, 10-97 etc
    officerName: "",
};

export default function (state = initState, action) {
    switch (action.type) {
        case EMS_GET_STATUS:
            return {
                ...state,
                status: action.status,
                status2: action.status2,
                deputyName: action.deputyName
            }
        case EMS_SET_ON_DUTY:
            return {
                ...state,
                status: action.status,
                status2: action.status2,
                deputyName: action.deputyName
            }
        case EMS_SET_STATUS:
            return {
                ...state,
                status2: action.newStatus,
                deputyName: action.deputyName
            }
        case EMS_SET_OFF_DUTY:
            return {
                ...state,
                status2: "",
                deputyName: "",
            }
        default: return state;
    }
}