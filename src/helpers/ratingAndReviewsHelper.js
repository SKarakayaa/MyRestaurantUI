const RatingAndReviewsHelper = {
  CalculateAvaragePoint: (customerComments) => {
    if(customerComments.length === 0)
      return 0;
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
