import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function createOrder(orderResult) {
  if (orderResult.success) {
    return { type: actionTypes.CREATE_ORDER_SUCCESS, payload: orderResult };
  } else {
    return { type: actionTypes.CREATE_ORDER_FAIL, payload: orderResult };
  }
}

export function loadOrders(orders) {
  return { type: actionTypes.GET_ORDERS, payload: orders.data };
}
export function loadOrderDetails(orderDetails) {
  return { type: actionTypes.GET_ORDER_DETAILS, payload: orderDetails.data };
}

//Connect to API
export function createOrderRequest(order, cart) {
  return function (dispatch) {
    return agent.Orders.createOrder(order).then((result) => {
      if (result.success) {
        cart.map((cartItem) => {
          for (let index = 0; index < cartItem.quantity; index++) {
            var orderDetail = {
              order_id: result.outs.frm_orders_id,
              product_id: cartItem.product.id,
              price: parseInt(cartItem.product.price),
            };
            if (cartItem.product.is_menu) {
              orderDetail.options =
                cartItem.product.options[index].choosenOptions;
            }
            if (
              cartItem.product.materials !== undefined &&
              Object.keys(cartItem.product.materials).length !== 0
            ) {
              // orderDetail.price += parseInt(
              //   cartItem.product.materials[0].totalMaterialsPrice
              // );
              orderDetail.price += parseInt(cartItem.product.materials[index].totalMaterialsPrice); 
              orderDetail.material_add =
                cartItem.product.materials[index].choosenMaterials;
            }
            agent.Orders.createOrderDetail(orderDetail);
          }
          return 0;
        });
      }
      dispatch(createOrder(result));
    });
  };
}

export function loadOrdersRequest(customerid) {
  const user = JSON.parse(window.localStorage.getItem("user"));
  if (user !== null) {
    return function (dispatch) {
      agent.Orders.loadOrders(customerid, user.session.userId).then((result) =>
        dispatch(loadOrders(result))
      );
    };
  }
}

export function loadOrderDetailRequest(orderid) {
  return function (dispatch) {
    agent.Orders.loadOrderDetails(orderid).then((result) =>
      dispatch(loadOrderDetails(result))
    );
  };
}
