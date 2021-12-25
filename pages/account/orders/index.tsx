import React, { useEffect, useState } from "react";
import Orders from "../../../components/partials/account/orders/Orders";
import withAuth from "../../../components/hocs/RouteAuth";
import { accessLevels } from "../../../utilities/constants";
import OrderRepository from "../../../repositories/OrderRepository";
import AccountLayout from "../../../components/visuals/Layout/AccountLayout/AccountLayout";
import Spinner from "../../../components/visuals/Spin/Spin";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    const res = await OrderRepository.getOrders();

    if (res.message === "success") {
      setOrders(res.data.orders);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <AccountLayout pageTitle={"Orders"}>
        {loading ? <Spinner /> : <Orders orders={orders} />}
      </AccountLayout>
    </>
  );
};

export default withAuth(OrdersPage, [accessLevels.USER]);
