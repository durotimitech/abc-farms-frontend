import React from "react";
import { Card } from "antd";
import Image from "next/dist/client/image";
import classes from "./WishlistCard.module.css";

const WishlistCard = (props) => {
  const { productTitle, productPrice } = props.item;
  return (
    <>
      <Card>
        <div className={classes.wishlist_card}>
          <Image
            src="/images/banana.png"
            width="100"
            height="100"
            alt="HOPEEEEEE"
          />
          <div className={classes.wishlist_product_title}>{productTitle}</div>

          <div className={classes.wishlist_product_price}>₦{productPrice}</div>
        </div>
      </Card>
    </>
  );
};

export default WishlistCard;
