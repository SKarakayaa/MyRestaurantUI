import axios from "axios";

axios.defaults.baseURL =
  "http://app.code2.io/rest/276ce05d-837b-4aa1-8f6f-ff02597a0e01";

  // axios.interceptors.request.use((config) => {
  //   const token = window.localStorage.getItem("token");
  //   if (token) config.headers.Authorization = `Bearer ${token}`;
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
  list: (customerid) =>
    request.get(`/Product/getProductsList?xcustomer_id=${customerid}`),
  getProductCategories: (customerid) =>
    request.get(`/Product/getProductCategoriesList?xcustomer_id${customerid}`),
  getProductMenus: (customerid) =>
    request.get(`/Product/getProductMenu?xcustomer_id=${customerid}`),
  getMenuOptions: (customerid, productid) =>
    request.get(
      `/Product/getProductDetailList?xcustomer_id=${customerid}&xproduct_id=${productid}`
    ),
};

const Customers = {
  getCustomerInfo: (customerid) =>
    request.get(`/Customer/getCustomerInfo?xcustomer_id=${customerid}`),
  getCustomerMoreInfo: (customerid) =>
    request.get(`/Customer/getMoreInfo?xcustomer_id=${customerid}`),
};

const Users = {
  createUser: (user) => request.post("/Users/createUser", user),
  login: (loginModel) =>
    request.post(
      `/User/login?userName=${loginModel.userName}&passWord=${loginModel.passWord}`,
      loginModel
    ),
  addRole: (userRoleModel) => request.post("/Users/addUserRole", userRoleModel),
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
};
