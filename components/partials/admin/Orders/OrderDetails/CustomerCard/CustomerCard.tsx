import { Card } from "antd";
import React from "react";
interface IProps{

  order:any
}

const CustomerCard:React.FC<IProps> = ({order}) => {
  const { customerName, email, phone } = order;

  return (
    <Card>
      Customer Information
      <h3>{customerName}</h3>
      <h5>{email}</h5>
      <h4>{phone}</h4>
    </Card>
  );
};

export default CustomerCard;
