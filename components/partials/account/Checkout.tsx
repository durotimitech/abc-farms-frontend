import React, { useState } from "react";
import {
  Button,
  Card,
  Collapse,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
} from "antd";
import OrderRepository from "../../../repositories/OrderRepository";
import router from "next/router";
import Spinner from "../../visuals/Spin/Spin";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../store/actions/cart";
import openNotification from "../../visuals/Notification";
import { links, localStorageVars } from "../../../utilities/constants";
const { Panel } = Collapse;

const Checkout = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const cartTotal = props.cartTotal;
  const cartItems = props.cartItems;

  const [loading, setLoading] = useState(false);
  const lastName = useSelector((state) => state.auth.lastName);
  const firstName = useSelector((state) => state.auth.firstName);
  const phone = useSelector((state) => state.auth.phone);
  const [customerPhone, setCustomerPhone] = useState(phone);
  const [deliveryMethod, setDeliveryMethod] = useState("Pickup Station");
  const [deliveryInfo, setDeliveryInfo] = useState(
    "Pickup from one of our offices. No 17A Abdul-Razak Road, GRA, Ilorin."
  );
  const [paymentMethod, setPaymentMethod] = useState("Card");

  const isValidPhone = (phone) => {
    const regex = /^\d{11}$/;

    if (regex.test(phone)) {
      const number = `+234${phone.slice(1, 11)}`;
      setCustomerPhone(number);

      return true;
    }
    return false;
  };

  const createOrder = async (data) => {
    setLoading(true);

    const res = await OrderRepository.createOrder({
      orderItems: JSON.stringify(cartItems),
      orderTotal: cartTotal,
      paymentMethod: "POD",
      customerName: data.customerName,
      customerPhone,
      deliveryMethod,
      paymentMethod,
    });

    if (res.message == "success") {
      setLoading(false);
      if (paymentMethod === "Card") {
        router.push(links.PAYMENT);
        localStorage.setItem(
          localStorageVars.ORDERIDS,
          JSON.stringify(res.data.orderIds)
        );
      } else {
        openNotification({
          type: "success",
          message: "Your order has been placed!",
        });
        router.push("/");
      }
      dispatch(clearCart());
    } else {
      router.push("/");
      dispatch(clearCart());
      setLoading(false);
    }
  };
  function callback(key) {
    console.log(key);
  }

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Form
            form={form}
            name="checkout"
            onFinish={createOrder}
            fields={[
              { name: ["customerName"], value: firstName + " " + lastName },
              { name: ["phone"], value: phone },
            ]}
          >
            {/* User Details */}
            <Collapse defaultActiveKey={["1"]} onChange={callback}>
              <Panel header="1. CUSTOMER DETAILS" key="1">
                {/* Customer name */}
                <Form.Item
                  className="input"
                  name="customerName"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please put in your name!" },
                  ]}
                >
                  <Input placeholder="Please put in your full name" />
                </Form.Item>

                {/* Customer Phone */}
                <Form.Item
                  className="input"
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please put in your phone number!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (isValidPhone(value)) return Promise.resolve();
                        return Promise.reject("Phone number is not valid!");
                      },
                    }),
                  ]}
                >
                  <Input placeholder="Please put in your phone number" />
                </Form.Item>
              </Panel>

              {/* Delivery Method */}
              <Panel header="2. DELIVERY METHOD" key="2">
                <Radio.Group
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  value={deliveryMethod}
                >
                  <Radio value={"Pickup Station"}>Pickup Station</Radio>
                </Radio.Group>
                <small>*{deliveryInfo}</small>
              </Panel>

              {/* Payment Method */}
              <Panel header="3. PAYMENT METHOD" key="3">
                <Radio.Group
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                >
                  <Radio value={"Card"}>Card</Radio>
                  <Radio value={"Payment On Delivery"}>
                    Payment On Delivery
                  </Radio>
                </Radio.Group>
              </Panel>
            </Collapse>
            {/* Submit Btn */}
            <Form.Item>
              <Button htmlType="submit" block className="btn">
                CONFIRM ORDER
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default Checkout;
