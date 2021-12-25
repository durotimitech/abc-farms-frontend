import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import withAuth from "../../../components/hocs/RouteAuth";
import OrderDetails from "../../../components/partials/account/orders/OrderDetails/OrderDetails";
import AccountLayout from "../../../components/visuals/Layout/AccountLayout/AccountLayout";
import Spinner from "../../../components/visuals/Spin/Spin";
import OrderRepository from "../../../repositories/OrderRepository";
import { accessLevels } from "../../../utilities/constants";

const OrderDetailsPage = () => {
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
    <div>
      <AccountLayout pageTitle={"Order Details"}>
        {loading ? <Spinner /> : <OrderDetails order={order} />}
      </AccountLayout>
    </div>
  );
};

export default withAuth(OrderDetailsPage, [accessLevels.USER]);
