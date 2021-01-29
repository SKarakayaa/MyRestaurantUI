import * as addressTypeEnum from "../enums/AddressTypeEnum";

import AuthHelper from "./authHelper";

const AddressHelper = {
  GetAddress: (addresses, addressid) => {
    const address = addresses.find((x) => x.frm_user_adress_id === addressid);
    return address === null
      ? "Address Not Found or Removed"
      : address.delivery_area +
          " - " +
          address.delivery_instructions +
          " - " +
          address.location;
  },
  GetAddressTypeName: (addressTypeId) => {
    switch (addressTypeId) {
      case addressTypeEnum.HOME:
        return "Home";
      case addressTypeEnum.WORK:
        return "Work";
      case addressTypeEnum.ADD:
        return "ADD";
      default:
        return "Other";
    }
  },
  GetAddressIcon: (addressTypeId) => {
    switch (addressTypeId) {
      case addressTypeEnum.HOME:
        return "home";
      case addressTypeEnum.WORK:
        return "briefcase";
      case addressTypeEnum.ADD:
        return "plus";
      default:
        return "location-pin";
    }
  },
  GetAddressTypeSelect: () => {
    return [
      { value: 1, label: "EV" },
      { value: 2, label: "İŞ" },
      { value: 3, label: "DİĞER" },
    ];
  },
  IsNullOrEmpty: (obj) => {
    for (var key in obj) {
      if (obj[key] === null && obj[key] === "") return false;
    }
    return true;
  },
  CreateModel: (state, cities, counties, areas, neighborhoods) => {
    const addressModel = {
      address_type: state.addressType.toString(),
      city_id: state.city,
      counties_id: state.county,
      area_id: state.area,
      neighborhoods_id: state.neighborhoods,
      delivery_instructions: state.openAddress,
      user_id: AuthHelper.GetCurrentUser().userId,
      complate_address:
        AddressHelper.GetLabel(areas, state.area) +
        " " +
        AddressHelper.GetLabel(neighborhoods, state.neighborhoods) +
        " " +
        state.openAddress +
        " " +
        AddressHelper.GetLabel(counties, state.county) +
        "/" +
        AddressHelper.GetLabel(cities, state.city),
    };
    if (state.address_id !== undefined) addressModel.tfrm_user_adress_id = state.address_id;
    return addressModel;
  },
  GetLabel: (array, value) => {
    return array.find((x) => x.value === value).label;
  },
};
export default AddressHelper;
