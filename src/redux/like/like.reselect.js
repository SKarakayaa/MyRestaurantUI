import { createSelector } from "reselect";
import memoize from "lodash.memoize";
const selectLike = (state) => state.like;

export const selectAreLikesFetching = createSelector(
  [selectLike],
  (like) => like.areLikesFetching
);
export const selectLikeCounts = memoize((commentid) =>
  createSelector(
    [selectLike],
    (like) =>
      like.likes.filter(
        (x) => x.comment_id === commentid && x.is_like_flag === "1"
      ).length
  )
);
export const selectDislikeCounts = memoize((commentid) =>
  createSelector(
    [selectLike],
    (like) =>
      like.likes.filter(
        (x) => x.comment_id === commentid && x.is_like_flag === "0"
      ).length
  )
);
export const selectIsCurrentUserLike = memoize((commentid, userid) => {
  return createSelector([selectLike], (like) =>
    like.likes.find(
      (x) => x.comment_id === commentid && x.user_id+"" === userid + ""
    )
  );
});
