/* disable-eslint */
import { combineReducers } from "redux";
import boloReducer from "./boloReducer";

export default combineReducers({
    bolos: boloReducer
});