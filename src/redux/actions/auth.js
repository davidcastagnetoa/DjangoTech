import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGOUT,
} from "./types.js";
import { setAlert } from "./alert.js";
import axios from "axios";
import { extractErrorMessage } from "../../lib/utils.ts";

/**
 * Asynchronous function that get the user data from the server after login/sign up success
 * sending a GET request with the JWT Token in header authorization
 * It dispatches actions based on the response received
 */
export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
      console.info("load_user function response: ", res.data);

      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: USER_LOADED_FAIL,
        });
      }
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    }
  } else {
    console.error("Token not found!");
    dispatch({
      type: USER_LOADED_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  }
};

/** Function that checks if there is an access token stored in the local storage.
 * If the token exists, it sends a POST request to verify the token with the backend API.
 * Depending on the response status, it dispatches either an
 * AUTHENTICATED_SUCCESS or AUTHENTICATED_FAIL action.
 */
export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      token: localStorage.getItem("access"),
    });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);
      console.log("check_authenticated response:", res?.data);
      console.log("check_authenticated status:", res.status);

      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

/**
 * Asynchronous function that handles user SIGN UP by
 * sending a POST request to the server with user information
 * It dispatches actions based on the response received.
 * @component : 'SignUp.jsx'
 * @params : 'email'
 * @params : 'first_name'
 * @params : 'last_name'
 * @params : 'password'
 * @params : 're_password'
 */
export const signup =
  ({ email, first_name, last_name, password, re_password }) =>
  async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      first_name,
      last_name,
      password,
      re_password,
    });

    console.log("Body for sign up:", body);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
      console.info("Singup function response: ", res);

      if (res.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert("Alta aceptada!", "Correo de activacion enviado, revisa tu bandeja de entrada o spam", "constructive"));
      } else {
        dispatch({
          type: SIGNUP_FAIL,
        });
        dispatch(setAlert("Error de servidor", "Error conectando con el servidor, intenta mas tarde.", "destructive"));
      }

      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (error) {
      let errorRes = error.response;

      console.error("Error status: ", JSON.stringify(errorRes?.status));
      console.error("Error response: ", JSON.stringify(errorRes?.data));

      dispatch({
        type: SIGNUP_FAIL,
      });
      const errorMessage = extractErrorMessage(error);
      if (errorMessage === "user account with this email already exists.") {
        dispatch(setAlert("Error", `${errorMessage}. Remember to activate your account, verify your inbox email`, "destructive"));
      } else {
        dispatch(setAlert("Error", errorMessage, "destructive"));
      }

      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    }
  };

/**
 * Asynchronous function that handles user SIGN IN by
 * sending a POST request to the server with user information
 * It dispatches actions based on the response received.
 * @component : 'Login.jsx'
 * @params : 'email'
 * @params : 'password'
 */
export const signin =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
    });

    console.log("Body for sign in:", body);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
      console.info("Singin function response: ", res.data);
      console.info("Singin function status: ", res.status);

      if (res.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert("Bienvenido!", "Acceso concedido", "constructive"));
        dispatch(load_user());
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
        dispatch(setAlert("Error de servidor", "Error conectando con el servidor, intenta mas tarde.", "destructive"));
      }
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (error) {
      let errorRes = error.response;

      console.error("Error status: ", JSON.stringify(errorRes?.status));
      console.error("Error response: ", JSON.stringify(errorRes?.data));

      dispatch({
        type: LOGIN_FAIL,
      });
      const errorMessage = extractErrorMessage(error);
      dispatch(setAlert("Error", errorMessage, "destructive"));
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    }
  };

/**
 * Asynchronous function that handles user activation by
 * sending a POST request to the server with user information
 * Use the response params when user register
 * It dispatches actions based on the response received.
 * @component : 'Activate.jsx'
 * @params : 'uid'
 * @params : 'token'
 */
export const activate =
  ({ uid, token }) =>
  async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      uid,
      token,
    });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
      console.log("Activate function response: ", res.data);
      console.log("Activate function status: ", res.status);

      if (res.status === 204) {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
        dispatch(setAlert("Confirmado!", "Tu cuenta ha sido activada", "constructive"));
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
        dispatch(setAlert("Error", "Error al activar cuenta", "destructive"));
      }

      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } catch (error) {
      let errorRes = error.response;

      console.error("Error status: ", JSON.stringify(errorRes?.status));
      console.error("Error response: ", JSON.stringify(errorRes?.data));

      dispatch({
        type: SIGNUP_FAIL,
      });

      const errorMessage = extractErrorMessage(error);
      dispatch(setAlert("Error", errorMessage, "destructive"));

      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      dispatch(setAlert("Server error!", "Error conectando con el servidor, intenta mas tarde.", "destructive"));
    }
  };

/**
 * Asynchronous function that handles user refresh by
 * sending a POST request to the server with user information
 * It dispatches actions based on the response received.
 */
export const refresh = () => async (dispatch) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);

      console.log("refresh response:", res?.data);
      console.log("refresh status:", res.status);

      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: REFRESH_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } else {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

/**
 * Function that dispatches a LOGOUT action.
 */
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert("Good bye!", "Succesfully logeed out!", "constructive"));
};
