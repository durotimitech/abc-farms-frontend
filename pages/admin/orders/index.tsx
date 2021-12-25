import React, { useEffect, useState } from "react";
import Orders from "../../../components/partials/admin/Orders/Orders";
import AdminLayout from "../../../components/visuals/Layout/AdminLayout/AdminLayout";
import Spinner from "../../../components/visuals/Spin/Spin";
import OrderRepository from "../../../repositories/OrderRepository";
import { _error } from "../../../utilities/_error";
import withAuth from "../../../components/hocs/RouteAuth";
import { accessLevels } from "../../../utilities/constants";

const OrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(null);

  const getOrders = async () => {

    const res = await OrderRepository.getAllOrders();
    if (res.message === "success") {
      setLoading(false);
      setOrders(res.data.orders);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getOrders();
  },[]);

  return (
    <>
      <AdminLayout pageTitle={"All Orders"}>
        {loading ? <Spinner /> :
        <Orders orders={orders} />}
      </AdminLayout>
    </>
  );
};

export default withAuth(OrdersPage, [accessLevels.SALESMAN, accessLevels.ADMIN]);
