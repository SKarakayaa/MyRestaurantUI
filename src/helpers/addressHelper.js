import * as addressTypeEnum from "../enums/AddressTypeEnum";

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
  GetCitiesForSelect: (cities) => {
    let selectCities = [];
    cities.forEach((city) => {
      selectCities.push({ value: city.id, label: city.dsc });
    });
    return selectCities;
  },
  GetCountiesForSelect: (counties) => {
    let selectCounties = [];
    counties.forEach((county) => {
      selectCounties.push({
        value: county.counties_id,
        label: county.countyname,
      });
    });
    return selectCounties;
  },
};
export default AddressHelper;
