import React from "react";
import { Card, Image } from "antd";
import classes from "./ProductCard.module.css";

interface IProps{

  order:any
}

const ProductCard:React.FC<IProps> = ({order}) => {
  const { productTitle, productImageUrl, quantity, total, createdAt } = order;
  
  return (
    <Card>
      <Image src={productImageUrl} alt={productTitle} />
      <p className={classes.productTitle}>{productTitle}</p>
      <p>Quantity: x{quantity}</p>
      <p>Ordered on: {createdAt.slice(0, 10)}</p>
      <p className={classes.price}>Total Cost: ₦{total}</p>
    </Card>
  );
};

export default ProductCard;
