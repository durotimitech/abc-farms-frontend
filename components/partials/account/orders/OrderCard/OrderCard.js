import { Button, Card } from "antd";
import React from "react";
import { Image } from "antd";
import classes from "./OrderCard.module.css";
import Link from "next/link";
import { links } from "../../../../../utilities/constants";

const OrderCard = ({ order }) => {
  const { productImageUrl, productTitle, orderId, quantity, createdAt } = order;

  return (
    <Card>
      <div className={classes.order_card}>
        <Image src={productImageUrl} width="50%" alt={productTitle} />
        <div className={classes.order_info}>
          <p className={classes.product_title}>{productTitle}</p>
          <p>Order {orderId}</p>
          <p>Qty: {quantity}</p>
          <p>Order placed on: {createdAt.slice(0, 10)}</p>
        </div>
        <Link href={`${links.ORDERS}/${orderId}`} passHref>
          <Button className="btn">See Details</Button>
        </Link>
      </div>
    </Card>
  );
};

export default OrderCard;
