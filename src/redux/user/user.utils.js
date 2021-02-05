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
export const deleteAddress = (addresses, addressid) => {
  return addresses.filter(
    (address) => address.frm_user_adress_id !== addressid
  );
};
export const deleteFavorite = (favorites, favoriteid) => {
  return favorites.filter(
    (favorite) => favorite.frm_user_product_favorites_id !== favoriteid
  );
};
