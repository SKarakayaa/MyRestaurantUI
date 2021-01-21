import { createSelector } from "reselect";

const selectAuth = (state) => state.auth;

export const selectLoginCompleted = createSelector(
  [selectAuth],
  (auth) => auth.loginCompleted
);
export const selectLoginError = createSelector(
  [selectAuth],
  (auth) => auth.loginError
);

export const selectRegisterCompleted = createSelector(
  [selectAuth],
  (auth) => auth.registerCompleted
);
export const selectRegisterError = createSelector(
  [selectAuth],
  (auth) => auth.registerError
);
