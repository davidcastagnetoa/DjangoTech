import { combineReducers } from "redux";
import Auth from "./auth.js";
import Alert from "./alert.js";

export default combineReducers({
  Auth,
  Alert,
});
