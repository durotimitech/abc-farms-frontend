import { ShopFilled } from "@ant-design/icons";
import React from "react";
import classes from "./NoProducts.module.css";

const NoProducts = () => {
  return (
    <div className={classes.noProducts}>
      <ShopFilled style={{ fontSize: 80 }} />
      <h3>Empty Shop</h3>
      <p>There are no products currently available!</p>
    </div>
  );
};

export default NoProducts;
