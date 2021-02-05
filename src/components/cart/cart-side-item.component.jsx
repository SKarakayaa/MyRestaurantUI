import CartSideItemCounterButtons from "./cart-side-counter-buttons.component";
import Icofont from "react-icofont";
import React from "react";
import { TranslatePlaceholder } from "../../utilities/translator-placeholder";

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
        <p className="mb-0">
        {cartItem.is_menu &&
          cartItem.options !== "" &&
          TranslatePlaceholder("Choosed :") + "" + cartItem.options}
      </p>
      <p className="mb-0">
        {cartItem.choosedMaterials !== "" &&
          TranslatePlaceholder("Added :") + cartItem.choosedMaterials}
      </p>
      <p className="mb-0">
        {cartItem.removedMaterials !== "" &&
          TranslatePlaceholder("Removed :") + cartItem.removedMaterials}
      </p>
      </div>
    </div>
    <div className="media">
      
    </div>
  </div>
);

export default CartSideItem;
