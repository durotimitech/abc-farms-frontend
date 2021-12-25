import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { links } from "../../../../utilities/constants";
import classes from "./EmptyCart.module.css";

const EmptyCart = () => {
  return (
    <div className={classes.emptyCart}>
      <ShoppingCartOutlined style={{ fontSize: 100 }} />
      <h3>Empty Basket</h3>
      <p>Your basket is still empty, browse our shop for products!</p>
      <Link href={links.HOME} passHref>
        <Button>Shop Now</Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
