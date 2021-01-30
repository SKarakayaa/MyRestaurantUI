export const updateLike = (likes, updatedLike) => {
  return likes.map((like) =>
    like.frm_comment_like_user_id === updatedLike.frm_comment_like_user_id
      ? { ...like, is_like_flag: updatedLike.is_like_flag }
      : like
  );
};
export const deleteLike = (likes, likeid) => {
  return likes.filter((like) => like.frm_comment_like_user_id !== likeid);
};
