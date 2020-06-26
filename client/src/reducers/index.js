import { combineReducers } from "redux";
import boloReducer from "./boloReducer";
import otherReducer from "./otherReducer";
import messageReducer from "./messageReducer";
import officerReducer from "./officerReducer";
import dispatchReducer from "./dispatchReducer";
import cadSettingsReducer from "./cadSettingsReducer";

export default combineReducers({
    bolos: boloReducer,
    aop: otherReducer,
    message: messageReducer,
    officer: officerReducer,
    dispatch: dispatchReducer,
    cad: cadSettingsReducer
});