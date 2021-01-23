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
};
export default AddressHelper;
