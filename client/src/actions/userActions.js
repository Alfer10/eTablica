import axios from "axios";
import {
  GET_USER,
  USER_LOADING,
  CLEAR_CURRENT_USER,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS
} from "./types";

//Get current user
export const getCurrentUser = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/users/current")
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: {}
      })
    );
};

//Change Password
export const changePassword = (passwordData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/users/change-password", passwordData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can't be undone!")) {
    axios
      .delete("/api/users")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

//Profile loading
export const setProfileLoading = () => {
  return {
    type: USER_LOADING
  };
};

//Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_USER
  };
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
