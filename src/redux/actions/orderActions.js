import * as actionTypes from "./actionTypes";

import agent from "../api/agent";

export function createOrder(orderResult) {
  return { type: actionTypes.CREATE_ORDER, payload: orderResult };
}

export function createOrderRequest(order, cart) {
  return function (dispatch) {
    agent.Orders.createOrder(order).then((result) => {
      console.log("order result : ", result);
      cart.map((cartItem) => {
        for (let index = 0; index < cartItem.quantity; index++) {
          var orderDetail = {
            order_id: result.outs.frm_orders_id,
            product_id: cartItem.product.id,
            price: cartItem.product.price,
          };
          if (cartItem.product.is_menu) {
            orderDetail.options =
              cartItem.product.options[index].choosenOptions;
          }
          console.log(`order detail ${index} :`, orderDetail);
          agent.Orders.createOrderDetail(orderDetail).then((detailResult) =>
            console.log(`detail result ${index} :`, detailResult)
          );
        }
        return 0;
      });
      dispatch(createOrder(result));
    });
  };
}
