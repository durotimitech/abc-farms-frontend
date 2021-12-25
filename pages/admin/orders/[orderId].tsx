import React, { useState, useEffect } from "react";
import OrderDetails from "../../../components/partials/admin/Orders/OrderDetails/OrderDetails";
import AdminLayout from "../../../components/visuals/Layout/AdminLayout/AdminLayout";
import Spinner from "../../../components/visuals/Spin/Spin";
import withAuth from "../../../components/hocs/RouteAuth";
import { accessLevels } from "../../../utilities/constants";
import { useRouter } from "next/router";
import OrderRepository from "../../../repositories/OrderRepository";
import { _error } from "../../../utilities/_error";

const OrderDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const { orderId } = router.query;

  const getSingleOrder = async () => {
    setLoading(true);
    const res = await OrderRepository.getSingleOrder(orderId);

    if (res.message === "success") {
      setLoading(false);
      setOrder(res.data);
    } else {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getSingleOrder();
  });

  return (
    <>
      <AdminLayout pageTitle={"View Order"}>
        {loading ? <Spinner /> : order ? <OrderDetails order={order} /> : ""}
      </AdminLayout>
    </>
  );
};

export default withAuth(OrderDetailPage, [accessLevels.SALESMAN,accessLevels.ADMIN]);
