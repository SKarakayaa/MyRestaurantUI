import { createSelector } from "reselect";

const selectComments = (state) => state.comments;

export const selectCustomerCommentsAreFetching = createSelector(
  [selectComments],
  (comments) => comments.areCustomerCommentsFetching
);
export const selectCustomerComments = createSelector(
  [selectComments],
  (comments) => comments.customerComments
);

export const selectSeeAllComments = createSelector(
  [selectComments],
  (comments) => (comments.seeAll ? comments.customerComments.length : 2)
);
