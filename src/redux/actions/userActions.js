import agent from "../api/agent";
import * as actionTypes from "./actionTypes";

export function getCurrentUser(currentUser) {
  return { type: actionTypes.GET_CURRENT_USER, payload: currentUser };
}

export function registerFunc(registerResult) {
  return { type: actionTypes.REGISTER, payload: registerResult };
}

export function loginFunc(loginResult){
  return {type:actionTypes.LOGIN,payload:loginResult};
}

export function register(user) {
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

export function login(loginModel){
  debugger;
  return function(dispatch){
    agent.Users.login(loginModel).then((result)=>dispatch(loginFunc(result)))
  }
}
