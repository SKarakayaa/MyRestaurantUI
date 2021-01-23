const ProductHelper = {
  GetProduct: (products, productid) => {
    return products.find((x) => x.frm_product_id === productid);
  },
};
export default ProductHelper;
