import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  loggingOut,
} from "./AuthAction";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const respo = await axios.post("auth/login", user);
    dispatch(loginSuccess(respo.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {
  dispatch(loggingOut());
};
