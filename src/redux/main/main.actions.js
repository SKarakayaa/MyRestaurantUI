import MainActionTypes from "./main.types";
import agent from "../api/agent";

export const chooseCity = (cityid) => ({
  type: MainActionTypes.CHOOSE_CITY,
  payload: cityid,
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
