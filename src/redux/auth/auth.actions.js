import AuthActionTypes from "./auth.types";
import agent from "../api/agent";

export const loginSuccess = (loginResult) => ({
  type: AuthActionTypes.LOGIN_SUCCESS,
  payload: loginResult,
});
export const loginFail = (loginResult) => ({
  type: AuthActionTypes.LOGIN_FAIL,
  payload: loginResult,
});
export const login = (loginModel) => {
  return (dispatch) => {
    agent.Users.login(loginModel).then((result) =>
      result.success
        ? dispatch(loginSuccess(result))
        : dispatch(loginFail(result))
    );
  };
};

export const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});
