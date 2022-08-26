import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const respo = await axios.post("auth/login", user);
    //respo.data.isAdmin &&
    dispatch(loginSuccess(respo.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
