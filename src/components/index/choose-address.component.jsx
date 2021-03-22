import { ListGroup, Tab, Tabs } from "react-bootstrap";
import { chooseCity, chooseCounty } from "../../redux/main/main.actions";
import {
  selectAreAddressesFetching,
  selectUserAddresses,
} from "../../redux/user/user.reselect";

import AddressHelper from "../../helpers/addressHelper";
import AuthHelper from "../../helpers/authHelper";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import Translate from '../../utilities/translator';
import { chooseAddress } from "../../redux/order/order.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchUserAddressesStartAsync } from "../../redux/user/user.actions";

class ChooseAddress extends React.Component {
  componentDidMount() {
    const { loadAddresses } = this.props;
    const userId = AuthHelper.GetCurrentUser().userId;
    loadAddresses(userId);
  }
  HandleClick = (choosedAddress) => {
    const { chooseCity, chooseCounty, chooseAddress, history } = this.props;
    chooseCity(choosedAddress.city_id);
    chooseCounty(choosedAddress.counties_id);
    chooseAddress(choosedAddress);
    history.push("/restaurants");
  };
  render() {
    const { addressesAreFetching, addresses } = this.props;
    if (addresses !== null && addresses.length !== 0) {
      this.props.chooseAddress(addresses[0]);
    }
    return (
      !addressesAreFetching && (
        <>
          <h4><Translate>Choose Address</Translate></h4>
          <Tabs id="uncontrolled-tab-example">
            {AddressHelper.GetAddressTypeSelect().map((addressType, index) => {
              const filteredAddresses = addresses.filter(
                (address) => address.address_type === addressType.value + ""
              );
              return (
                filteredAddresses.length > 0 && (
                  <Tab eventKey={index} title={addressType.label} key={index}>
                    <ListGroup>
                      {filteredAddresses.map((filteredAddress, i) => (
                        <ListGroup.Item key={i}>
                          <Link
                            style={{ color: "black" }}
                            onClick={() => this.HandleClick(filteredAddress)}
                            to="#"
                          >
                            <Icofont
                              icon={
                                AddressHelper.GetAddressIcon(
                                  filteredAddress.address_type
                                ) + " icofont-2x"
                              }
                            />{" "}
                            {filteredAddress.complate_address}
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Tab>
                )
              );
            })}
          </Tabs>
        </>
      )
    );
  }
}
const mapStateToProps = createStructuredSelector({
  addressesAreFetching: selectAreAddressesFetching,
  addresses: selectUserAddresses,
});
const mapDispatchToProps = (dispatch) => ({
  loadAddresses: (userid) => dispatch(fetchUserAddressesStartAsync(userid)),
  chooseCity: (cityid) => dispatch(chooseCity(cityid)),
  chooseCounty: (countyid) => dispatch(chooseCounty(countyid)),
  chooseAddress: (addressid) => dispatch(chooseAddress(addressid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChooseAddress);
