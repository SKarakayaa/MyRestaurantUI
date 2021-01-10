import Icofont from "react-icofont";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

class CardItem extends React.Component {
  render() {
    return (
      <div
        className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm"
        key={this.props.id}
      >
        <div className="list-card-image">
          <Link to={this.props.linkUrl}>
            <Image
              src={this.props.image}
              className={this.props.imageClass}
              alt={this.props.imageAlt}
            />
          </Link>
        </div>
        <div className="p-3 position-relative">
          <div className="list-card-body">
            <h6 className="mb-1">
              <Link to={this.props.linkUrl} className="text-black">
                {this.props.title}
              </Link>
            </h6>
            {this.props.subTitle ? (
              <p className="text-gray mb-3">{this.props.subTitle}</p>
            ) : (
              ""
            )}
            {this.props.time || this.props.price ? (
              <p className="text-gray mb-3 time">
                {this.props.time ? (
                  <span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2">
                    <Icofont icon="wall-clock" /> {this.props.time}
                  </span>
                ) : (
                  ""
                )}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default CardItem;
