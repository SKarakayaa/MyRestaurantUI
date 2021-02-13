const CustomerHelper = {
  FilterCustomer: (areaid, customers) => {
    var filteredCustomers = customers;
    if (areaid !== 0)
      filteredCustomers = customers.filter((customer) =>
        customer.area_id.split(",").includes(areaid)
      );
    return filteredCustomers;
  },
};
export default CustomerHelper;
