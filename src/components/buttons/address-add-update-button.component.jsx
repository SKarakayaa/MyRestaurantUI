import {
  fetchAreasStartAsync,
  fetchCitiesStartAsync,
  fetchCountiesStartAsync,
  fetchNeighborhoodsStartAsync,
} from "../../redux/address/address.actions";

import AddUpdateAddressModal from "../modals/add-update-address-modal.component";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import Translate from '../../utilities/translator';
import { connect } from "react-redux";

class AddressAddUpdateButton extends React.Component {
  state = {
    modalIsShow: false,
  };
  UpdateClick = () => {
    this.setState({ modalIsShow: true });
  };
  OnHide = () => {
    this.setState({ modalIsShow: false });
  };
  render() {
    const { isAdd, address } = this.props;
    const { modalIsShow } = this.state;
    return (
      <>
        {modalIsShow ? (
          <AddUpdateAddressModal
            show={modalIsShow}
            onHide={this.OnHide}
            address={address !== undefined && address}
          />
        ) : null}
        {isAdd ? (
          <Link
            className="btn btn-sm btn-primary mr-2"
            to="#"
            onClick={() => this.setState({ modalIsShow: true })}
          >
            <Translate>ADD NEW ADDRESS</Translate>
          </Link>
        ) : (
          <Link className="text-primary mr-3" to="#" onClick={this.UpdateClick}>
            <Icofont icon="ui-edit" /> <Translate>EDIT</Translate>
          </Link>
        )}
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  loadCities: () => dispatch(fetchCitiesStartAsync()),
  loadCounties: (cityid) => dispatch(fetchCountiesStartAsync(cityid)),
  loadAreas: (countyid) => dispatch(fetchAreasStartAsync(countyid)),
  loadNeighborhoods: (areaid) => dispatch(fetchNeighborhoodsStartAsync(areaid)),
});
export default connect(null, mapDispatchToProps)(AddressAddUpdateButton);
