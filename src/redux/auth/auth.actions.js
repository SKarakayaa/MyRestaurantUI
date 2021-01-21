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

export const registerSuccess = (registerResult) => {
  var userRoleModel = {
    user_id: registerResult.outs.user_id,
    role_id: 1,
  };
  agent.Users.addRole(userRoleModel);
  return {
    type: AuthActionTypes.REGISTER_SUCCESS,
    payload: registerResult,
  };
};
export const registerFail = (registerResult) => ({
  type: AuthActionTypes.REGISTER_FAIL,
  payload: registerResult,
});
export const register = (registerModel) => {
  return (dispatch) => {
    agent.Users.register(registerModel).then((result) =>
      result.success
        ? dispatch(registerSuccess(result))
        : dispatch(registerFail(result))
    );
  };
};
