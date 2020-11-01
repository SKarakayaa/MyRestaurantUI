import { Button, Form } from "react-bootstrap";
import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
import Review from "../../common/Review";
import StarRating from "../../common/StarRating";

class Comments extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      mostPopular: [],
      showAddressModal: false,
      users: [
        {
          name: "Osahan Singh",
          image: "/img/user/5.png",
          url: "#",
        },
        {
          name: "Gurdeep Osahan",
          image: "/img/user/2.png",
          url: "#",
        },
        {
          name: "Askbootstrap",
          image: "/img/user/3.png",
          url: "#",
        },
        {
          name: "Osahan Singh",
          image: "/img/user/4.png",
          url: "#",
        },
      ],
    };
  }
  render() {
    return (
      <Fragment>
        <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
          <Link to="#" className="btn btn-outline-primary btn-sm float-right">
            Top Rated
          </Link>
          <h5 className="mb-1">All Ratings and Reviews</h5>
          <Review
            image="/img/user/1.png"
            ImageAlt=""
            ratingStars={5}
            Name="Singh Osahan"
            profileLink="#"
            reviewDate="Tue, 20 Mar 2020"
            reviewText="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classNameical literature, discovered the undoubtable source. Lorem Ipsum comes from sections"
            likes="856M"
            dislikes="158K"
            otherUsers={this.state.users}
          />
          <hr />
          <Review
            image="/img/user/6.png"
            ImageAlt=""
            ratingStars={5}
            Name="Gurdeep Osahan"
            profileLink="#"
            reviewDate="Tue, 20 Mar 2020"
            reviewText="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
            likes="88K"
            dislikes="1K"
            otherUsers={this.state.users}
          />
          <hr />
          <Link
            className="text-center w-100 d-block mt-4 font-weight-bold"
            to="#"
          >
            See All Reviews
          </Link>
        </div>
        <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
          <h5 className="mb-4">Leave Comment</h5>
          <p className="mb-2">Rate the Place</p>
          <div className="mb-4">
            <div className="star-rating">
              <StarRating fontSize={26} star={5} getValue={this.getStarValue} />
            </div>
          </div>
          <Form>
            <Form.Group>
              <Form.Label>Your Comment</Form.Label>
              <Form.Control as="textarea" />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" size="sm" type="button">
                {" "}
                Submit Comment{" "}
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Fragment>
    );
  }
}
export default Comments;
