import React from "react";
import { useShop } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useShop();
  const cartAmount = getCartAmount(); // Avoid multiple function calls
  const shippingFee = delivery_fee || 0; // Ensure it's a valid number
  const totalAmount = cartAmount === 0 ? 0 : cartAmount + shippingFee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTAL" />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {cartAmount.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {shippingFee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {totalAmount.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
