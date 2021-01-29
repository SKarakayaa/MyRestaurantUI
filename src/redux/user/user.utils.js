export const updateAddress = (addresses, updatedAddress) => {
  return addresses.map((address) =>
    address.frm_user_adress_id === updatedAddress.tfrm_user_adress_id
      ? {
          ...address,
          city_id: updatedAddress.city_id,
          counties_id: updatedAddress.counties_id,
          area_id: updatedAddress.area_id,
          neighborhoods_id: updatedAddress.neighborhoods_id,
          delivery_instructions: updatedAddress.delivery_instructions,
          complate_address: updatedAddress.complate_address,
        }
      : address
  );
};
