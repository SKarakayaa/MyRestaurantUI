import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, Media } from "react-bootstrap";
import Icofont from "react-icofont";
import PropTypes from "prop-types";

class AddressCard extends React.Component {
  render() {
    return (
      <Card
        className={"bg-white addresses-item mb-4 " + this.props.boxClass}
        style={{ height: 170 }}
      >
        <div className="gold-members p-4">
          {this.props.cardType === "address-info" ? (
            <Fragment>
              <Media>
                <div className="mr-3">
                  <Icofont
                    icon={this.props.icoIcon}
                    className={this.props.iconclassName}
                  />
                </div>
                <div className="media-body">
                  <h6 className="mb-1 text-secondary">{this.props.title}</h6>
                  <p className="text-black">{this.props.address}</p>

                  <p className="mb-0 text-black font-weight-bold">
                    <Link
                      className="text-primary mr-3"
                      to="#"
                      onClick={this.props.onEditClick}
                    >
                      <Icofont icon="ui-edit" /> EDIT
                    </Link>
                    <Link
                      className="text-danger"
                      to="#"
                      onClick={this.props.onDeleteClick}
                    >
                      <Icofont icon="ui-delete" /> DELETE
                    </Link>
                  </p>
                </div>
              </Media>
            </Fragment>
          ) : (
            <Link
              onClick={this.props.onAddClick}
              to="#"
              className="text-danger"
              style={{ fontSize: 80 }}
            >
              <Icofont icon="ui-add" /> ADD
            </Link>
          )}
        </div>
      </Card>
    );
  }
}

AddressCard.propTypes = {
  title: PropTypes.string.isRequired,
  icoIcon: PropTypes.string.isRequired,
  iconclassName: PropTypes.string,
  address: PropTypes.string,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default AddressCard;
