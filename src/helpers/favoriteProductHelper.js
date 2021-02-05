const FavoriteProductHelper = {
  GetFavoriteInformation: (favorites, productid) => {
    const favorite = favorites.find(
      (favorite) => favorite.product_id === productid
    );
    return favorite !== undefined
      ? { isFavorite: true, favoriteId: favorite.frm_user_product_favorites_id }
      : { isFavorite: false, favoriteId: 0 };
  },
};
export default FavoriteProductHelper;