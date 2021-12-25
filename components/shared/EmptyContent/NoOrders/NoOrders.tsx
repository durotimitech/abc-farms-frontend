import { ShoppingCartOutlined } from "@ant-design/icons";
import React from "react";
import classes from "./NoOrders.module.css";

const AdminNoOrders = () => {
  return (
    <div className={classes.noOrders}>
      <ShoppingCartOutlined style={{ fontSize: 80 }} />
      <h3>No Orders</h3>
      <p>There are no currentlly no orders!</p>
    </div>
  );
};

export default AdminNoOrders;
