import * as actionTypes from "./actionTypes";

import agent from "../api/agent";
import { parse } from "@fortawesome/fontawesome-svg-core";

export function createOrder(orderResult) {
  return { type: actionTypes.CREATE_ORDER, payload: orderResult };
}

export function createOrderRequest(order, cart) {
  debugger;
  return function (dispatch) {
    agent.Orders.createOrder(order).then((result) => {
      debugger;
      console.log("order result : ", result);
      cart.map((cartItem) => {
        for (let index = 0; index < cartItem.quantity; index++) {
          var orderDetail = {
            order_id: result.outs.frm_orders_id,
            product_id: cartItem.product.id,
            price: parseInt(cartItem.product.price) + parseInt(cartItem.product.materials.totalMaterialsPrice),
          };
          if (cartItem.product.is_menu) {
            orderDetail.options =
              cartItem.product.options[index].choosenOptions;
          }
          if(Object.keys(cartItem.product.materials).length !== 0){
            orderDetail.material_add = cartItem.product.materials[index].choosenMaterials;
          }
          console.log(`order detail ${index} :`, orderDetail);
          debugger;
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
