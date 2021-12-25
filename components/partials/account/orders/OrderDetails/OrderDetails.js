import { Card, Image } from "antd";
import React from "react";

const OrderDetails = ({ order }) => {
  const { productImageUrl, productTitle, quantity, total } = order;

  return (
    <div>
      <Card>
        <Image src={productImageUrl} alt={productTitle} />
        {productTitle}
        Qty: {quantity}
        Total: {total}
      </Card>
    </div>
  );
};

export default OrderDetails;
