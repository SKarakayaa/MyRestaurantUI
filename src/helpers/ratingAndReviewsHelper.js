const RatingAndReviewsHelper = {
  CalculateAvaragePoint: (customerComments) => {
    let totalPoint = 0;
    let avg = 0;
    customerComments.forEach((comment) => {
      totalPoint += parseInt(comment.flavor);
    });
    avg = totalPoint / customerComments.length;
    return avg.toFixed(2);
  },
  GetStarCountByPointValue: (customerComments, point) => {
    let count = customerComments.filter((x) => parseInt(x.flavor) === point)
      .length;
    return count;
  },
};
export default RatingAndReviewsHelper;
