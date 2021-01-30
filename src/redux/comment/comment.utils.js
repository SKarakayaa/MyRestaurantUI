export const updateComment = (comments, updatedComment) => {
  return comments.map((comment) =>
    comment.frm_customer_comments_id === updatedComment.frm_customer_comments_id
      ? {
          ...comment,
          flavor: updatedComment.flavor,
          comment: updatedComment.comment,
        }
      : comment
  );
};
