import { deleteLike, updateLike } from "./like.utils";

import LikeActionTypes from "./like.types";

const INITIAL_STATE = {
  areLikesFetching: true,
  likes: null,
};

const likeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LikeActionTypes.FETCH_COMMENT_LIKES_START:
      return {
        ...state,
        areLikesFetching: true,
      };
    case LikeActionTypes.FETCH_COMMENT_LIKES_SUCCESS:
      return {
        ...state,
        likes: action.payload,
        areLikesFetching: false,
      };
    case LikeActionTypes.ADD_LIKE_SUCCESS:
      return {
        ...state,
        likes: [...state.likes, { ...action.payload }],
      };
    case LikeActionTypes.UPDATE_LIKE_SUCCESS:
      return {
        ...state,
        likes: updateLike(state.likes, action.payload),
      };
    case LikeActionTypes.DELETE_LIKE_SUCCESS:
      return {
        ...state,
        likes: deleteLike(state.likes, action.payload),
      };
    default:
      return state;
  }
};
export default likeReducer;
