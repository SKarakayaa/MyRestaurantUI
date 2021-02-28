import { chooseCity, chooseCounty } from "../../redux/main/main.actions";
import {
  fetchCitiesStartAsync,
  fetchCountiesStartAsync,
} from "../../redux/address/address.actions";
import {
  selectCities,
  selectCounties,
} from "../../redux/address/address.reselect";
import { selectCityId, selectCountyId } from "../../redux/main/main.reselect";

import { Form } from "react-bootstrap";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import MainPagesHelper from "../../helpers/mainPagesHelper";
import React from "react";
import Select2 from "react-select2-wrapper";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

class SearchAddress extends React.Component {
  HandleChange = (e) => {
    const { chooseCity, chooseCounty, loadCounties } = this.props;
    const { name, value } = e.target;
    if (value !== "" && name === "city") {
      chooseCity(e.target.value);
      loadCounties(value);
    }
    if (value !== "" && name === "county") {
      chooseCounty(value);
    }
  };
  componentDidMount() {
    const { cities, loadCities } = this.props;
    if (cities === undefined) {
      loadCities();
    }
  }
  render() {
    const { cities, cityId, counties, countyId } = this.props;
    return (
      cities !== undefined && (
        <Form className="form-noborder">
          <div className="form-row">
            <Form.Group className="col-lg-5 col-md-5 col-sm-12">
              <div className="location-dropdown">
                <Icofont icon="location-arrow" />
                <Select2
                  className="custom-select"
                  data={MainPagesHelper.FormatCities(cities)}
                  name="city"
                  value={cityId}
                  onChange={this.HandleChange}
                  options={{
                    placeholder: "Choose City",
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group className="col-lg-5 col-md-5 col-sm-12">
              <div className="location-dropdown">
                <Icofont icon="location-arrow" />
                <Select2
                  className="custom-select"
                  data={MainPagesHelper.FormatCities(counties)}
                  name="county"
                  value={countyId}
                  onChange={this.HandleChange}
                  options={{
                    placeholder: "Choose County",
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group className="col-lg-2 col-md-2 col-sm-12">
              <Link
                to={cityId !== 0 ? "restaurants" : "#"}
                className="btn btn-primary btn-block btn-lg btn-gradient"
              >
                Search
              </Link>
            </Form.Group>
          </div>
        </Form>
      )
    );
  }
}
const mapStateToProps = createStructuredSelector({
  cities: selectCities,
  counties: selectCounties,
  cityId: selectCityId,
  countyId: selectCountyId,
});
const mapDispatchToProps = (dispatch) => ({
  chooseCity: (cityId) => dispatch(chooseCity(cityId)),
  chooseCounty: (countyId) => dispatch(chooseCounty(countyId)),
  loadCounties: (cityId) => dispatch(fetchCountiesStartAsync(cityId)),
  loadCities: () => dispatch(fetchCitiesStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchAddress);
