import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import {
  fetchAreasStartAsync,
  fetchCountiesStartAsync,
  fetchNeighborhoodsStartAsync,
} from "../../redux/address/address.actions";
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
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCreateAddressAsync } from "../../redux/user/user.actions";

class AddUpdateAddressModal extends React.Component {
  state = {
    id: null,
    addressType: null,
    city: null,
    county: null,
    area: null,
    neighborhoods: null,
    openAddress: "",
    errorMessage: "",
  };
  handleSelectChange(name, value) {
    const { loadCounties, loadAreas, loadNeighborhoods } = this.props;
    this.setState({ [name]: value });
    if (name === "city") {
      this.setState({ county: null, area: null, neighborhoods: null });
      loadCounties(value.value);
    }
    if (name === "county") {
      this.setState({ area: null, neighborhoods: null });
      loadAreas(value.value);
    }
    if (name === "area") {
      this.setState({ neighborhoods: null });
      loadNeighborhoods(value.value);
    }
  }
  HandleSubmit = (event) => {
    event.preventDefault();
    var model = AddressHelper.CreateModel(this.state);
    console.log("model :", model);
    // this.props.createAddress(model);
  };
  render() {
    const {
      show,
      onHide,
      addressId,
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
            Address Processes
          </Modal.Title>
        </Modal.Header>
        <span style={{ color: "red" }}>{this.state.errorMessage}</span>
        <Form onSubmit={this.HandleSubmit}>
          <Modal.Body>
            <SingleSelect
              label="Address Tipi Seçiniz"
              options={AddressHelper.GetAddressTypeSelect()}
              onChange={this.handleSelectChange.bind(this, "addressType")}
              required
            />
            {!citiesAreFetching && (
              <SingleSelect
                options={cities}
                onChange={this.handleSelectChange.bind(this, "city")}
                required
                label="Şehir Seçiniz"
              />
            )}
            {!countiesAreFetching && (
              <SingleSelect
                options={counties}
                onChange={this.handleSelectChange.bind(this, "county")}
                required
                label="İlçe Seçiniz"
              />
            )}
            {!areasAreFetching && (
              <SingleSelect
                options={areas}
                onChange={this.handleSelectChange.bind(this, "area")}
                required
                label="Bölge Seçiniz"
              />
            )}
            {!neighborhoodsAreFetching && (
              <SingleSelect
                options={neighborhoods}
                onChange={this.handleSelectChange.bind(this, "neighborhoods")}
                required
                label="Mahalle Seçiniz"
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
              CANCEL
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              {addressId !== 0 && addressId !== undefined ? "UPDATE" : "ADD"}
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUpdateAddressModal);
