import MainActionTypes from "./main.types";
import agent from "../api/agent";

export const chooseCity = (cityid) => ({
  type: MainActionTypes.CHOOSE_CITY,
  payload: cityid,
});
export const chooseCounty = (countyid) => ({
  type: MainActionTypes.CHOOSE_COUNTY,
  payload: countyid,
});

export const fetchCustomersStart = () => ({
  type: MainActionTypes.FETCH_CUSTOMERS_START,
});
export const fetchCustomerSuccess = (customers) => ({
  type: MainActionTypes.FETCH_CUSTOMERS_SUCCESS,
  payload: customers.data,
});
export const fetchCustomersStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCustomersStart());
    agent.HomepageRequests.loadCustomers().then((result) =>
      dispatch(fetchCustomerSuccess(result))
    );
  };
};

export const fetchCuisinesStart = () => ({
  type: MainActionTypes.FETCH_CUISINES_START,
});
export const fetchCuisinesSuccess = (cuisines) => ({
  type: MainActionTypes.FETCH_CUISINES_SUCCESS,
  payload: cuisines.data,
});
export const fetchCuisinesStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCuisinesStart());
    agent.HomepageRequests.laodCuisines().then((result) =>
      dispatch(fetchCuisinesSuccess(result))
    );
  };
};

export const resetMain = () => ({
  type: MainActionTypes.RESET_MAIN,
});
export const leaveRestaurantPage = () => ({
  type: MainActionTypes.LEAVE_RESTAURANT_PAGE,
});

export const fetchUserOrdersStart = () => ({
  type: MainActionTypes.FETCH_USER_ORDERS_START,
});
export const fetchUserOrderSuccess = (orders) => {
  console.log("orders :", orders);
  return {
    type: MainActionTypes.FETCH_USER_ORDERS_SUCCESS,
    payload:
      orders.data.length > 0 && orders.data !== null
        ? orders.data.filter(
            (x) => x.order_status_id !== "3" && x.order_status_id !== "4"
          )
        : null,
  };
};
export const fetchUserOrderStartAsync = (userid) => {
  return (dispatch) => {
    dispatch(fetchUserOrdersStart());
    agent.Orders.loadAllOrders(userid).then((result) =>
      dispatch(fetchUserOrderSuccess(result))
    );
  };
};
