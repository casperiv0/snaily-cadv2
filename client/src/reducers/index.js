import { combineReducers } from "redux";
import boloReducer from "./boloReducer";
import otherReducer from "./otherReducer";
import messageReducer from "./messageReducer";
import officerReducer from "./officerReducer";
import dispatchReducer from "./dispatchReducer";
import cadSettingsReducer from "./cadSettingsReducer";
import emergencyCallsReducer from "./911CallsReducer"
import towCallsReducer from "./towCallsReducer";
import emsFdReducer from "./emsFdReducer";
import recordReducer from "./recordReducer";
import citizenReducer from "./citizenReducer";

export default combineReducers({
    bolos: boloReducer,
    aop: otherReducer,
    message: messageReducer,
    officer: officerReducer,
    dispatch: dispatchReducer,
    cad: cadSettingsReducer,
    calls: emergencyCallsReducer,
    towCalls: towCallsReducer,
    ems: emsFdReducer,
    record: recordReducer,
    citizens: citizenReducer,
});