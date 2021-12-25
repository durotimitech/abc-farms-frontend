import React from "react";
import OrderCard from "./OrderCard/OrderCard";
import NoOrders from "../../../shared/EmptyContent/NoOrders/NoOrders";

const 
Orders = ({ orders }) => {
  return (
    <>
      <h1>My Orders</h1>
      {orders.length < 1 ? (
        <NoOrders />
      ) : (
        orders.map((order) => <OrderCard key={order.orderId} order={order} />)
      )}
    </>
  );
};

export default Orders;
