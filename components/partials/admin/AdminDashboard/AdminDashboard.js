import React from "react";
import AnimatedNumber from "react-animated-number";
import classes from "./AdminDashboard.module.css";
import { Card } from "antd";

const AdminDashboard = (props) => {
  const { productCount, userCount, totalOrderCount } = props;

  return (
    <>
      <h1>Dashboard</h1>
      <div className={classes.dashboard_card_row}>
        {/* Orders */}
        <Card>
          <div className={classes.dashboard_status}>
            <AnimatedNumber
              className={classes.status_count}
              value={totalOrderCount}
              formatValue={(n) => n.toFixed(0)}
            />
            Total Orders
          </div>
        </Card>

        {/* Products */}
        <Card>
          <div className={classes.dashboard_status}>
            <AnimatedNumber
              className={classes.status_count}
              value={productCount}
              formatValue={(n) => n.toFixed(0)}
            />
            Total Products
          </div>
        </Card>

        {/* Users */}
        <Card>
          <div className={classes.dashboard_status}>
            <AnimatedNumber
              className={classes.status_count}
              value={userCount}
              formatValue={(n) => n.toFixed(0)}
            />
            Total Users
          </div>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
