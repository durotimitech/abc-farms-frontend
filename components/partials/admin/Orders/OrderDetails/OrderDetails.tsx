import React from "react";
import CustomerCard from "./CustomerCard/CustomerCard";
import OrderStatus from "./OrderStatus/OrderStatus";
import ProductCard from "./ProductCard/ProductCard";

interface IProps{

  order:any
}

const OrderDetails:React.FC<IProps> = ({order}) => {
  const { orderId } = order;

  return (
    <>
      <h3>Order ID: {orderId}</h3>
      <ProductCard order={order} />
      <CustomerCard order={order} />
      <OrderStatus order={order} />
    </>
  );
};

export default OrderDetails;
