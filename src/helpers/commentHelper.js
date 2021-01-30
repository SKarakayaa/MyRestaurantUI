const CommentHelper = {
  ValidateCommentModel: (state) => {
    if (state.flavor === 0 || state.comment === "") return false;
    return true;
  },
};
export default CommentHelper;
