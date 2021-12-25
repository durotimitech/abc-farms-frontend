import React from "react";
import { Table, Tag } from "antd";
import Link from "next/link";

interface IProps{

  orders:any
}


const OrdersTable:React.FC<IProps> = ({ orders }) => {
  const columns = [
    {
      title: "Order Id",
      dataIndex: "productId",
      key: "productId",
      render: (orderId) => (
        <Link href={`/admin/orders/${orderId}`} passHref>
          <a>{orderId}</a>
        </Link>
      ),
    },
    {
      title: "Order",
      dataIndex: "productTitle",
      key: "productTitle",
      render: (productTitle, record) => (
        <Link href={`/admin/orders/${record.orderId}`}>
          <a>{record.productTitle}</a>
        </Link>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Date Ordered",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <p>{date.slice(0, 10)}</p>,
    },
    {
      title: "Price",
      dataIndex: "total",
      key: "total",
      render: (price) => <p>₦{price}</p>,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (value) => {
        const orderStatus = JSON.parse(value);
        if (orderStatus.length > 0) {
          const currentStatus = orderStatus[orderStatus.length - 1];
          let color = () => {
            if (currentStatus.orderStatus) {
              switch (currentStatus.orderStatus) {
                case "pending":
                  return "grey";
                default:
                  return "grey";
              }
            } else {
              return;
            }
          };
          return (
            <Tag color={color()}>
              {currentStatus.orderStatus
                ? currentStatus.orderStatus.toUpperCase()
                : ""}
            </Tag>
          );
        } else {
          return <Tag>PENDING</Tag>;
        }
      },
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
  ];

  return (
    <>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey={(record) => record.orderId}
      />
      ;
    </>
  );
};

export default OrdersTable;
