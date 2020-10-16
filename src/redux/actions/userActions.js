import agent from "../api/agent";
import * as actionTypes from "./actionTypes";

export function getCurrentUser(currentUser) {
  return { type: actionTypes.GET_CURRENT_USER, payload: currentUser };
}

export function registerFunc(registerResult) {
  return { type: actionTypes.REGISTER, payload: registerResult };
}

export function register(user) {
  debugger;
  return function (dispatch) {
    agent.Users.createUser(user).then((result) => {
      var userRoleModel = {
        user_id:result.outs.user_id,
        role_id:1
      }
      agent.Users.addRole(userRoleModel);
      dispatch(registerFunc(result))
    }
    );
  };
}
