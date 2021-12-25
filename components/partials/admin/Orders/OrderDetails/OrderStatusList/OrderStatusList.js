import { Steps } from "antd";
import React, { useState } from "react";
import { getCapitalized } from "../../../../../../utilities/utilities";

const { Step } = Steps;

const OrderStatusList = ({ orderStatus }) => {
  const [current, setCurrent] = useState(orderStatus.length - 1);

  return (
    <div>
      <Steps progressDot current={current}>
        {orderStatus.map((status) => {
          return (
            <Step
              key={status.orderStatus}
              title={getCapitalized(status.orderStatus)}
              description={status.updatedAt}
            />
          );
        })}
      </Steps>
    </div>
  );
};

export default OrderStatusList;
