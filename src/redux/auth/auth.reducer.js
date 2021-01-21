import AuthActionTypes from "./auth.types";
import AuthHelper from "../../helpers/authHelper";

const INITIAL_STATE = {
  loginError: "",
  loginCompleted: AuthHelper.IsLogin(),
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      AuthHelper.SetCurrentUser(action.payload.session);
      AuthHelper.SetToken(action.payload.token);
      return {
        ...state,
        loginCompleted: true,
        loginError: "",
      };
    case AuthActionTypes.LOGIN_FAIL:
      return {
        ...state,
        loginCompleted: false,
        loginError: action.payload.error,
      };
    case AuthActionTypes.LOGOUT:
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      return {
        ...state,
        loginCompleted: false,
        loginError: "",
      };
    default:
      return state;
  }
};
export default authReducer;
