const CustomerHelper = {
  FilterCustomer: (
    areaid,
    destinyId,
    orderTime,
    checkedCuisines,
    customers
  ) => {
    var filteredCustomers = customers;
    if (areaid !== 0) {
      filteredCustomers = customers.filter((customer) =>
        customer.area_id.split(",").includes(areaid)
      );
    }

    if (checkedCuisines.length !== 0) {
      let newFilteredCustomers = [];
      checkedCuisines.forEach((checkedItem) => {
        const search = filteredCustomers.filter((x) =>
          x.cuisines.includes(checkedItem)
        );
        if (search.length >= 1) {
          search.forEach((searchResult) => {
            if (
              !newFilteredCustomers.find(
                (x) => x.frm_customer_id === searchResult.frm_customer_id
              )
            ) {
              newFilteredCustomers.push(searchResult);
            }
          });
        }
      });
      filteredCustomers = newFilteredCustomers;
    }
    if (destinyId !== 0) {
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.customer_status === destinyId
      );
    }
    if (orderTime !== "") {
      filteredCustomers = filteredCustomers.filter((customer) =>
        customer.order_time.includes(orderTime)
      );
    }
    return filteredCustomers;
  },
};
export default CustomerHelper;
