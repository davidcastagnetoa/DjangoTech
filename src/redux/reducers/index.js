import { combineReducers } from "redux";
import Auth from "./auth.js";
import Alert from "./alert.js";
import Categories from "./categories.js";

export default combineReducers({
  Auth,
  Alert,
  Categories,
});
