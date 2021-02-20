const CustomerHelper = {
  FilterCustomer: (
    areaid,
    destinyId,
    orderTime,
    checkedCuisines,
    customers
  ) => {
    debugger;
    console.log("customers :", customers);
    console.log("area id:", areaid);
    var filteredCustomers = customers;
    console.log("filtered 1:", filteredCustomers);
    if (areaid !== 0) {
      filteredCustomers = customers.filter((customer) =>
        customer.area_id.split(",").includes(areaid)
      );
      console.log("filtered 2:", filteredCustomers);
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
      console.log("filtered 3:", filteredCustomers);
    }
    if (destinyId !== 0) {
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.customer_status === destinyId
      );
      console.log("filtered 4:", filteredCustomers);
    }
    if (orderTime !== "") {
      filteredCustomers = filteredCustomers.filter((customer) =>
        customer.order_time.includes(orderTime)
      );
      console.log("filtered 5:", filteredCustomers);
    }
    return filteredCustomers;
  },
};
export default CustomerHelper;
