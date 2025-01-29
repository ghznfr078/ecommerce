import React from "react";
import { useShop } from "../context/ShopContext";

const LatestCollection = () => {
  const { products } = useShop();

  return (
    <div>
      <h1>{delivery_fee}</h1>
    </div>
  );
};

export default LatestCollection;
