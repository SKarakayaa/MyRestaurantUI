import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import {
  fetchAreasStartAsync,
  fetchCountiesStartAsync,
  fetchNeighborhoodsStartAsync,
} from "../../redux/address/address.actions";
import {
  fetchCreateAddressAsync,
  fetchUpdateAddressAsync,
} from "../../redux/user/user.actions";
import {
  selectAreAreasFetching,
  selectAreCitiesFetching,
  selectAreCountiesFetching,
  selectAreNeighborhoodsFetching,
  selectAreas,
  selectCities,
  selectCounties,
  selectNeighborhoods,
} from "../../redux/address/address.reselect";

import AddressHelper from "../../helpers/addressHelper";
import React from "react";
import SingleSelect from "../dropdowns/single-select.component";
import Translate from "../../utilities/translator";
import { TranslatePlaceholder } from "../../utilities/translator-placeholder";
import UserActionTypes from "../../redux/user/user.types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class AddUpdateAddressModal extends React.Component {
  constructor(props) {
    super(props);
    const { address } = props;
    this.state = {
      address_id: address !== null ? address.frm_user_adress_id : undefined,
      addressType: address !== null ? address.address_type : undefined,
      city: address !== null ? address.city_id : undefined,
      county: address !== null ? address.counties_id : undefined,
      area: address !== null ? address.area_id : undefined,
      neighborhoods: address !== null ? address.neighborhoods_id : undefined,
      openAddress: address !== null ? address.delivery_instructions : "",
      errorMessage: "",
    };
  }
  componentDidMount() {
    const { address, loadCounties, loadAreas, loadNeighborhoods } = this.props;
    if (address !== null) {
      loadCounties(address.city_id);
      loadAreas(address.counties_id);
      loadNeighborhoods(address.area_id);
    }
  }
  handleSelectChange(event) {
    const { name, value } = event.target;
    const { loadCounties, loadAreas, loadNeighborhoods } = this.props;
    this.setState({ [name]: value });
    if (name === "city") {
      this.setState({
        county: undefined,
        area: undefined,
        neighborhoods: undefined,
      });
      loadCounties(value);
    }
    if (name === "county") {
      this.setState({ area: undefined, neighborhoods: undefined });
      loadAreas(value);
    }
    if (name === "area") {
      this.setState({ neighborhoods: undefined });
      loadNeighborhoods(value);
    }
  }
  HandleSubmit = (event) => {
    event.preventDefault();
    const { cities, counties, areas, neighborhoods, address } = this.props;
    var model = AddressHelper.CreateModel(
      this.state,
      cities,
      counties,
      areas,
      neighborhoods
    );
    if (address === null) {
      this.props.createAddress(model).then((result) => {
        if (result.type === UserActionTypes.CREATE_ADDRESS_SUCCESS)
          this.props.onHide();
      });
    } else {
      this.props.updateAddress(model).then((result) => {
        if (result.type === UserActionTypes.UPDATE_ADDRESS_SUCCESS)
          this.props.onHide();
      });
    }
  };
  render() {
    const {
      show,
      onHide,
      address,
      citiesAreFetching,
      cities,
      countiesAreFetching,
      counties,
      areasAreFetching,
      areas,
      neighborhoodsAreFetching,
      neighborhoods,
    } = this.props;
    return (
      <Modal show={show} onHide={onHide} size="m" centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            <Translate>Address Processes</Translate>
          </Modal.Title>
        </Modal.Header>
        <span style={{ color: "red" }}>{this.state.errorMessage}</span>
        <Form onSubmit={this.HandleSubmit}>
          <Modal.Body>
            <SingleSelect
              label={TranslatePlaceholder("Choose Address Type")}
              options={AddressHelper.GetAddressTypeSelect()}
              value={this.state.addressType}
              name="addressType"
              onChange={this.handleSelectChange.bind(this)}
              required
            />
            {!citiesAreFetching && (
              <SingleSelect
                options={cities}
                onChange={this.handleSelectChange.bind(this)}
                value={this.state.city}
                required
                name="city"
                label={TranslatePlaceholder("Choose City")}
              />
            )}
            {!countiesAreFetching && (
              <SingleSelect
                options={counties}
                onChange={this.handleSelectChange.bind(this)}
                required
                value={this.state.county}
                name="county"
                label={TranslatePlaceholder("Choose County")}
              />
            )}
            {!areasAreFetching && (
              <SingleSelect
                options={areas}
                onChange={this.handleSelectChange.bind(this)}
                required
                value={this.state.area}
                name="area"
                label={TranslatePlaceholder("Choose Area")}
              />
            )}
            {!neighborhoodsAreFetching && (
              <SingleSelect
                options={neighborhoods}
                onChange={this.handleSelectChange.bind(this)}
                required
                value={this.state.neighborhoods}
                name="neighborhoods"
                label={TranslatePlaceholder("Choose Neighborhood")}
              />
            )}
            <FormGroup>
              <Form.Label>Açık Adres</Form.Label>
              <Form.Control
                as="textarea"
                name="openAddress"
                value={this.state.openAddress}
                required
                onChange={(e) => this.setState({ openAddress: e.target.value })}
                className="form-control"
                rows={3}
              />
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="button"
              onClick={onHide}
              variant="outline-primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              <Translate>CANCEL</Translate>
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              {address !== null
                ? TranslatePlaceholder("UPDATE")
                : TranslatePlaceholder("ADD")}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  citiesAreFetching: selectAreCitiesFetching,
  cities: selectCities,
  countiesAreFetching: selectAreCountiesFetching,
  counties: selectCounties,
  areasAreFetching: selectAreAreasFetching,
  areas: selectAreas,
  neighborhoodsAreFetching: selectAreNeighborhoodsFetching,
  neighborhoods: selectNeighborhoods,
});
const mapDispatchToProps = (dispatch) => ({
  loadCounties: (cityid) => dispatch(fetchCountiesStartAsync(cityid)),
  loadAreas: (countyid) => dispatch(fetchAreasStartAsync(countyid)),
  loadNeighborhoods: (areaid) => dispatch(fetchNeighborhoodsStartAsync(areaid)),
  createAddress: (addressModel) =>
    dispatch(fetchCreateAddressAsync(addressModel)),
  updateAddress: (addressModel) =>
    dispatch(fetchUpdateAddressAsync(addressModel)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUpdateAddressModal);
