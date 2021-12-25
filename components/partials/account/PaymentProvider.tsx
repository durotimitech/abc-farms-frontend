import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import router from "next/router";
import { Button } from "antd";
import OrderRepository from "../../../repositories/OrderRepository";
import openNotification from "../../visuals/Notification";
import { getDate } from "../../../utilities/utilities";

export default function App({ orderTotal, orderInfo, orderIds }) {
  const config = {
    public_key: process.env.NEXT_PUBLIC_FW_PK,
    tx_ref: Date.now(),
    amount: orderTotal,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: orderInfo[0].email,
      phonenumber: orderInfo[0].cutomerPhone,
      name: orderInfo[0].customerName,
    },
    customizations: {
      title: "Complete Payment",
      description: "Payment for items",
      logo: "../../../public/images/logo.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const completePayment = async (response) => {
    if (response.status === "successful") {
      openNotification({
        type: "success",
        message: "Your order has been placed!",
      });

      const res = await Promise.all(
        orderInfo.map(async (order) => {
          // Get order statuses
          const orderStatus = JSON.parse(order.orderStatus);

          orderStatus.push({ orderStatus: "paid", updatedAt: getDate() });

          const res = await OrderRepository.updateOrder({
            orderStatus: JSON.stringify(orderStatus),
            orderId: order.orderId,
          });

          return res;
        })
      );
    }

    router.push("/");
  };

  return (
    <div className="App">
      <h1>Complete Payment</h1>

      <Button
        className="btn"
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              completePayment(response);
              closePaymentModal();
            },
            onClose: () => {
              router.push("/");
            },
          });
        }}
      >
        Pay Now
      </Button>
    </div>
  );
}
