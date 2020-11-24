import axios from "axios";

// axios.defaults.baseURL =
//   "http://app.code2.io/rest/276ce05d-837b-4aa1-8f6f-ff02597a0e01";

axios.defaults.baseURL="http://206.189.55.20:8080/rest/276ce05d-837b-4aa1-8f6f-ff02597a0e01";

// axios.interceptors.request.use((config) => {
//   const token = window.localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

const responseBody = (response) => {
  return response.data;
};

// const sleep = (ms) => (response) =>
//   new Promise((resolve) => setTimeout(() => resolve(response), ms));

const resolve = (response) => new Promise((resolve) => resolve(response));

const request = {
  get: (url) => axios.get(url).then(resolve).then(responseBody),
  post: (url, body) => axios.post(url, body).then(resolve).then(responseBody),
  put: (url, body) => axios.put(url, body).then(resolve).then(responseBody),
  delete: (url) => axios.delete(url).then(resolve).then(responseBody),
};

const Products = {
  loadProducts: (customerid) =>
    request.get(`/Product/getProductsList?xcustomer_id=${customerid}`),
  loadCategories: (customerid) =>
    request.get(`/Product/getProductCategoriesList?xcustomer_id${customerid}`),
  loadMenuOptions: (customerid, productid) =>
    request.get(
      `/Product/getProductDetailList?xcustomer_id=${customerid}&xproduct_id=${productid}`
    ),
  loadMaterials: (customerid) =>
    request.get(`/Product/getProductMaterial?xcustomer_id=${customerid}`),
};

const Customers = {
  loadCustomerInfo: (customerid) =>
    request.get(`/Customer/getCustomerInfo?xcustomer_id=${customerid}`),
  loadCustomerMoreInfo: (customerid) =>
    request.get(`/Customer/getMoreInfo?xcustomer_id=${customerid}`),
};

const Users = {
  register: (user) => request.post("/Users/createUser", user),
  login: (loginModel) =>
    request.post(
      `/User/login?userName=${loginModel.userName}&passWord=${loginModel.passWord}`,
      loginModel
    ),
  addRole: (userRoleModel) => request.post("/Users/addUserRole", userRoleModel),
  addFavorite: (addFavoriteModel) =>
    request.post("/Users/addFavoritesProduct", addFavoriteModel),
  deleteFavorite: (favoriteid) =>
    request.delete(
      `/Users/deleteFavoritesProduct?tfrm_user_product_favorites_id=${favoriteid}`
    ),
  loadFavorites: (userid, customerid) =>
    request.get(
      `/Users/getUserFavoritesProducts?xuser_id=${userid}&xcustomer_id=${customerid}`
    ),
  loadUserInfo: (userid) =>
    request.get(`/Users/getUserInfo?xuser_id=${userid}`),
};

const Address = {
  loadAddresses: (userid, customerid) =>
    request.get(
      `/Users/getUserAddress?xuser_id=${userid}&xcustomer_id=${customerid}`
    ),
  createAddress: (address) => request.post("/Users/addUserAddress", address),
  updateAddress: (address) => request.put("/Users/updateUserAddress", address),
  deleteAddress: (addressid) =>
    request.delete(
      `/Users/deleteUserAddress?tfrm_user_address_id=${addressid}`
    ),
};

const Orders = {
  createOrder: (order) => request.post("/Orders/addOrders", order),
  createOrderDetail: (orderDetail) =>
    request.post("/Orders/addOrderDetail", orderDetail),
};

export default {
  Products,
  Customers,
  Users,
  Orders,
  Address,
};
