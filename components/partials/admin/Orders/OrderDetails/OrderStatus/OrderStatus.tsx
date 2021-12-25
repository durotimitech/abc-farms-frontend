import { Card, Modal, Popconfirm, Select } from "antd";
import React, { useState } from "react";
import OrderStatusList from "../OrderStatusList/OrderStatusList";
import { allOrderStatus } from "../../../../../../utilities/constants";
import { getCapitalized } from "../../../../../../utilities/utilities";
import { getDate } from "../../../../../../utilities/utilities";
import OrderRepository from "../../../../../../repositories/OrderRepository";
import Spinner from "../../../../../visuals/Spin/Spin";
import openNotification from "../../../../../visuals/Notification";
const { Option } = Select;

interface IProps{

  order:any
}

const OrderStatus:React.FC<IProps> = ({ order }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const orderStatus = JSON.parse(order.orderStatus);
  const latestStatus = orderStatus[orderStatus.length - 1];

  const handleChange = (value) => {
    setCurrentStatus(value);
    setIsModalVisible(true);
  };

  const updateOrderStatus = async () => {
    setIsModalVisible(false);
    setLoading(true);
    orderStatus.push({ orderStatus: currentStatus, updatedAt: getDate() });
    orderStatus = JSON.stringify(orderStatus);
    const data = {
      orderId: order.orderId,
      orderStatus,
    };

    const res = await OrderRepository.updateOrder(data);

    if (res.message === "success") {
      openNotification({
        type: "success",
        message: "Order status has been updated!",
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Update Order Status"
        visible={isModalVisible}
        onOk={updateOrderStatus}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to update the status of this order?</p>
      </Modal>
      {loading ? (
        <Spinner />
      ) : (
        <Card>
          Update Order Status
          <Select
            defaultValue={latestStatus.orderStatus}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            {allOrderStatus.map((status) => {
              return (
                <Option key={status.status} value={status.status}>
                  {getCapitalized(status.status)}
                </Option>
              );
            })}
          </Select>
          <OrderStatusList orderStatus={orderStatus} />
        </Card>
      )}
    </>
  );
};

export default OrderStatus;
