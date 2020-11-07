import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function getCurrentUser() {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  return { type: actionTypes.GET_CURRENT_USER, payload: currentUser };
}

export function logout() {
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("token");
  return { type: actionTypes.LOGOUT, payload: null };
}

export function register(registerResult) {
  return { type: actionTypes.REGISTER, payload: registerResult };
}

export function login(loginResult) {
  localStorage.setItem("user", JSON.stringify(loginResult));
  localStorage.setItem("token", loginResult.token);
  return { type: actionTypes.LOGIN, payload: loginResult };
}

//Request to API
export function registerRequest(user) {
  return function (dispatch) {
    agent.Users.register(user).then((result) => {
      var userRoleModel = {
        user_id: result.outs.user_id,
        role_id: 1,
      };
      agent.Users.addRole(userRoleModel);
      dispatch(register(result));
    });
  };
}

export function loginRequest(loginModel) {
  return function (dispatch) {
    agent.Users.login(loginModel).then((result) => dispatch(login(result)));
  };
}
