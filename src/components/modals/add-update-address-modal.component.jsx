import { Button, Form, FormGroup, FormLabel, Modal } from "react-bootstrap";
import {
  fetchAreasStartAsync,
  fetchCountiesStartAsync,
} from "../../redux/address/address.actions";
import {
  selectAreAreasFetching,
  selectAreCitiesFetching,
  selectAreCountiesFetching,
  selectAreas,
  selectCities,
  selectCounties,
} from "../../redux/address/address.reselect";

import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class AddUpdateAddressModal extends React.Component {
  state = {
    city: null,
    county: null,
  };
  handleSelectChange(name, value) {
    const { loadCounties, loadAreas } = this.props;
    if (name === "city") {
      this.setState({ [name]: value });
      this.setState({ county: null });
      loadCounties(value.value);
    }
    if (name === "county") {
      this.setState({ [name]: value });
      loadAreas(value.value);
    }
  }
  HandleSubmit = (event) => {
    event.preventDefault();
    console.log("address model :", this.state);
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
    } = this.props;
    return (
      <Modal show={show} onHide={onHide} size="m" centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            Address Processes
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.HandleSubmit}>
          <Modal.Body>
            {!citiesAreFetching && (
              <FormGroup>
                <FormLabel>Şehir Seçiniz</FormLabel>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="city"
                  onChange={this.handleSelectChange.bind(this, "city")}
                  options={cities}
                />
              </FormGroup>
            )}
            {!countiesAreFetching && (
              <FormGroup>
                <FormLabel>İlçe Seçiniz</FormLabel>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="county"
                  onChange={this.handleSelectChange.bind(this, "county")}
                  options={counties}
                />
              </FormGroup>
            )}
            {!areasAreFetching && (
              <FormGroup>
                <FormLabel>Bölge Seçiniz</FormLabel>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="area"
                  options={areas}
                />
              </FormGroup>
            )}
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
});
const mapDispatchToProps = (dispatch) => ({
  loadCounties: (cityid) => dispatch(fetchCountiesStartAsync(cityid)),
  loadAreas: (countyid) => dispatch(fetchAreasStartAsync(countyid)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUpdateAddressModal);
