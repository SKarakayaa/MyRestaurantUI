import * as addressActions from "../../redux/actions/addressActions";

import {
  Button,
  ButtonToolbar,
  Form,
  InputGroup,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";

import Icofont from "react-icofont";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class AddAddressModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addressTypes: [
        { id: "1", name: "Home" },
        { id: "2", name: "Work" },
        { id: "3", name: "Other" },
      ],
      adress_type: 0,
      complete_address: "",
      delivery_area: "",
      delivery_instructions: "",
      location: "",
      choosedAddress: null,
    };
  }
  componentDidMount() {
    const { choosedAddress } = this.props;
    if (choosedAddress !== undefined && choosedAddress !== null) {
      this.setState({ adress_type: choosedAddress.address_type });
      this.setState({ delivery_area: choosedAddress.delivery_area });
      this.setState({
        delivery_instructions: choosedAddress.delivery_instructions,
      });
      this.setState({ location: choosedAddress.location });
    }
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { choosedAddress } = this.props;
    const addAddressModel = {
      address_type: this.state.adress_type,
      complete_address: this.state.complete_address,
      delivery_area: this.state.delivery_area,
      delivery_instructions: this.state.delivery_instructions,
      location: this.state.location,
      user_id: this.props.currentUser.session.userId,
    };
    if (choosedAddress !== null) {
      addAddressModel.tfrm_user_adress_id = choosedAddress.frm_user_adress_id;
    }
    this.setState({ adress_type: 0 });
    this.setState({ complete_address: "" });
    this.setState({ delivery_area: "" });
    this.setState({ delivery_instructions: "" });
    this.setState({ location: "" });

    if (choosedAddress !== null) {
      this.props.actions.updateAddress(addAddressModel);
    } else {
      this.props.actions.createAddress(addAddressModel);
    }
    this.props.onHide();
  };
  handleAddressType = (addressTypeId) => {
    this.setState({ adress_type: addressTypeId });
  };
  render() {
    const { choosedAddress } = this.props;
    console.log("choosed address :", choosedAddress);
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="add-address">
            Add Delivery Address
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <div className="form-row">
              <Form.Group className="col-md-12">
                <Form.Label>Delivery Area</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Delivery Area"
                    id="delivery_area"
                    name="delivery_area"
                    value={this.state.delivery_area}
                    onChange={this.handleChange}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      <Icofont icon="ui-pointer" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Complete Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Complete Address e.g. house number, street name, landmark"
                  id="complete_address"
                  name="complete_address"
                  value={this.state.complete_address}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Delivery Instructions</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Delivery Instructions e.g. Opposite Gold Souk Mall"
                  id="delivery_instructions"
                  name="delivery_instructions"
                  value={this.state.delivery_instructions}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-0 col-md-12">
                <Form.Label>Nickname</Form.Label>
                <ButtonToolbar>
                  <ToggleButtonGroup
                    className="d-flex w-100"
                    type="radio"
                    name="options"
                    defaultValue={1}
                  >
                    {this.state.addressTypes.map((addressType) => (
                      <ToggleButton
                        variant={
                          this.state.adress_type === addressType.id
                            ? "success"
                            : "info"
                        }
                        value={addressType.id}
                        key={addressType.id}
                        onClick={() => this.handleAddressType(addressType.id)}
                      >
                        {addressType.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Form.Group>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="button"
              onClick={this.props.onHide}
              variant="outline-primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              CANCEL
            </Button>
            <Button
              type="SUBMIT"
              variant="primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              SUBMIT
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      createAddress: bindActionCreators(
        addressActions.createAddressRequest,
        dispatch
      ),
      updateAddress: bindActionCreators(
        addressActions.updateAddressRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAddressModal);
