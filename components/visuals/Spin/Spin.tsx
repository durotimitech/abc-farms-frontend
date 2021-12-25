import React from "react";
import { Spin } from "antd";
import classes from "./Spin.module.css";

const Spinner = () => {
  return (
    <div className={classes.center}>
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
