import React from "react";
import classes from "./Cart.module.css";
import { Button } from "antd";
import Link from "next/link";
import CartCard from "./CartCard/CartCard";
import { links } from "../../../../utilities/constants";

const 
Cart = ({ cartItems, cartTotal, cartInDb }) => {
  return (
    <div className={`${classes.cart}`}>
      {cartItems.map((item) => (
        <CartCard
          key={item.productId}
          item={item}
          cartItems={cartItems}
          cartInDb={cartInDb}
        />
      ))}
      <Link href={links.CHECKOUT} passHref>
        <Button className="btn">₦{cartTotal} - Checkout</Button>
      </Link>
    </div>
  );
};

export default Cart;
