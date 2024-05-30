import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "./types";
import { setAlert } from "./alert";
import { axios } from "axios";

// * Function that checks if there is an access token stored in the local storage.
// * If the token exists, it sends a POST request to verify the token with the backend API.
// * Depending on the response status, it dispatches either an AUTHENTICATED_SUCCESS or AUTHENTICATED_FAIL action.

// export const check_authenticated = () => async (dispatch) => {
//   if (localStorage.getItem("access")) {
//     const config = {
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//     };

//     const body = JSON.stringify({
//       token: localStorage.getItem("access"),
//     });

//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

//       if (res.status === 200) {
//         dispatch({
//           type: AUTHENTICATED_SUCCESS,
//         });
//       } else {
//         dispatch({
//           type: AUTHENTICATED_FAIL,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: AUTHENTICATED_FAIL,
//       });
//     }
//   } else {
//     dispatch({
//       type: AUTHENTICATED_FAIL,
//     });
//   }
// };

// * Asynchronous function that handles user sign up by sending a POST request to the server with user information.
// * It dispatches actions based on the response received.
export const signup = (email, first_name, last_name, password, re_password) => async (dispatch) => {
  dispatch({
    type: SIGNUP_SUCCESS,
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

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
    console.log("Singup function response: ", res.data);

    if (res.status === 201) {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("Correo de activacion enviado, revisa tu bandeja de entrada o spam", "green")); // - Alternative:  You can use a toast from Shadcn UI/UX
    } else {
      dispatch({
        type: SIGNUP_FAIL,
      });
      dispatch(setAlert("Error al crear cuenta", "red"));
    }

    // - Alternative: You can use a loading state for the signup button to indicate that the request is in progress, or a squeleton component
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
    });
    dispatch(setAlert("Error conectando con el servidor, intenta mas tarde.", "red")); // - Alternative:  You can use a toast from Shadcn UI/UX
  }
};
