import React, { useEffect, useState } from "react";
import { accessLevels, localStorageVars } from "../../utilities/constants";
import withAuth from "../../components/hocs/RouteAuth";
import OrderRepository from "../../repositories/OrderRepository";
import PaymentProvider from "../../components/partials/account/PaymentProvider";
import Spinner from "../../components/visuals/Spin/Spin";

const PaymentPage = () => {
  const orderIds = JSON.parse(localStorage.getItem(localStorageVars.ORDERIDS));
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderInfo, setOrderInfo] = useState(0);
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    let total = 0;

    const orderInfo = await Promise.all(
      orderIds.map(async (id) => {
        const res = await OrderRepository.getSingleOrder(id);

        total += res.data.total;

        return res.data;
      })
    );

    setOrderTotal(total);
    setOrderInfo(orderInfo);
    setLoading(false);
    localStorage.removeItem(localStorageVars.ORDERIDS);
  };

  useEffect(() => {
    getOrders();
  });

  return (
    <div className="container">
      {loading ? (
        <Spinner />
      ) : orderTotal && orderInfo ? (
        <PaymentProvider
          orderTotal={orderTotal}
          orderInfo={orderInfo}
          orderIds={orderIds}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default withAuth(PaymentPage, [accessLevels.USER]);
