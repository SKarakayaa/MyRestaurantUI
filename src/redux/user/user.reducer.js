import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  isFetchingUserInfo: true,
  userInfo: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER_INFO_START:
      return {
        ...state,
        isFetchingUserInfo: true,
      };
    case UserActionTypes.FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isFetchingUserInfo: false,
      };
    default:
      return state;
  }
};
export default userReducer;
