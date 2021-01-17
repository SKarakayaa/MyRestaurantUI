import CartSideItemCounterButtons from "./cart-side-counter-buttons.component";
import Icofont from "react-icofont";
import React from "react";

const CartSideItem = ({ cartItem, currencyUnit }) => (
  <div className="gold-members p-2 border-bottom">
    <CartSideItemCounterButtons cartItem={cartItem} />
    <p className="text-gray mb-0 float-right ml-2">
      {cartItem.quantity * cartItem.price} {currencyUnit}
    </p>
    <div className="media">
      <div className="mr-2">
        <Icofont icon="ui-press" className="text-danger food-item" />
      </div>
      <div className="media-body">
        <p className="mt-1 mb-0 text-black">{cartItem.name}</p>
      </div>
    </div>
    <div className="media">
      <div className="media-body">
        <p className="mt-1 mb-0">
          {cartItem.is_menu && cartItem.options + " "}
          {cartItem.choosedMaterials} {cartItem.removedMaterials}
        </p>
      </div>
    </div>
  </div>
);

export default CartSideItem;
