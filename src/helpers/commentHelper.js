const CommentHelper = {
  ValidateCommentModel: (state) => {
    if (state.flavor === 0 || state.comment === "") return false;
    return true;
  },
  LıkeButtonColor: (isLike,islike) => {
    if (isLike !== undefined) {
      if (isLike.is_like_flag === "1" && islike) {
        return true;
      }
      if (isLike.is_like_flag === "0" && !islike) {
        return true;
      }
      return false;
    }
  },
};
export default CommentHelper;
