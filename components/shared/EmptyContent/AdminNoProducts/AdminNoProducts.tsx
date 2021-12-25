import { ShopFilled } from "@ant-design/icons";
import React from "react";
import classes from "./AdminNoProducts.module.css";
import { Button } from "antd";
import { links, localStorageVars } from "../../../../utilities/constants";
import router from "next/router";

const AdminNoProducts = () => {
  const goToAddProductPage = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageVars.ADDEDITPRODUCT, "add");
      localStorage.setItem(localStorageVars.PRODUCTDATA, JSON.stringify({}));
      router.push(links.ADDEDITPRODUCT);
    }
  };

  return (
    <div className={classes.noProducts}>
      <ShopFilled style={{ fontSize: 80 }} />
      <h3>Empty Shop</h3>
      <p>There are no products currently available!</p>

      <Button onClick={goToAddProductPage}>Add Products</Button>
    </div>
  );
};

export default AdminNoProducts;
