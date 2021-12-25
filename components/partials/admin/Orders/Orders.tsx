import React from "react";
import OrdersTable from "./OrdersTable/OrdersTable";
import NoOrders from "../../../shared/EmptyContent/NoOrders/NoOrders";

interface IProps{

  orders:any
}

const Orders:React.FC<IProps> = ({ orders }) => {
  return (
    <>
      <h1>Orders</h1>
      {orders < 1 ? (
        <NoOrders />
      ) : orders ? (
        <OrdersTable orders={orders} />
      ) : (
        <h1>No orders</h1>
      )}
    </>
  );
};

export default Orders;
