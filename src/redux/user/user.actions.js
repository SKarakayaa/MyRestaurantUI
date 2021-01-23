import UserActionTypes from "./user.types";
import agent from "../api/agent";

export const fetchUserInfoStart = () => ({
  type: UserActionTypes.FETCH_USER_INFO_START,
});
export const fetchUserInfoSuccess = (userInfo) => ({
  type: UserActionTypes.FETCH_USER_INFO_SUCCESS,
  payload: userInfo.data[0],
});
export const fetchUserInfoStartAsync = (userid) => {
  return (dispatch) => {
    dispatch(fetchUserInfoStart());
    agent.Users.loadUserInfo(userid).then((result) =>
      dispatch(fetchUserInfoSuccess(result))
    );
  };
};
