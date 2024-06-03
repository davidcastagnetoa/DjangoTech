import { SET_ALERT, REMOVE_ALERT } from "../actions/types.js";

const initialState = {
  alert: null,
};

export default function Alert(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
}
