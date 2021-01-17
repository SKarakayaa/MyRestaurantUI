import React, { Component } from "react";

import Icofont from "react-icofont";

class StarRating extends Component {
  constructor(props) {
    super(props);
    this.state = { star: this.props.star || 0 };
  }

  handleClick(starValue) {
    if (!this.props.disabled) {
      this.setState({ star: starValue });
      this.props.handlePoint(starValue);
    }
  }

  render() {
    const pointArray = [1, 2, 3, 4, 5];
    return (
      <div
        style={{ fontSize: this.props.fontSize ? this.props.fontSize : 14 }}
        className="d-inline-block"
      >
        {!this.props.disabled ? (
          <>
            {pointArray.map((point) => (
              <Icofont
                icon="star"
                key={point}
                className={
                  this.state.star >= point ? "text-primary" : "text-dark"
                }
                onClick={() => this.handleClick(point)}
              />
            ))}
          </>
        ) : (
          <>
            {pointArray.map((point) => (
              <Icofont
                icon="star"
                key={point}
                className={
                  this.props.star >= point ? "text-primary" : "text-dark"
                }
                onClick={() => this.handleClick(point)}
              />
            ))}
          </>
        )}
      </div>
    );
  }
}
StarRating.defaultProps = {
  star: 0,
  disabled: false,
};

export default StarRating;
