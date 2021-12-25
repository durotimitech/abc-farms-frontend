import React from "react";
import Checkout from "../../components/partials/account/Checkout";
import withAuth from "../../components/hocs/RouteAuth";
import { useSelector } from "react-redux";
import Spinner from "../../components/visuals/Spin/Spin";
import { accessLevels } from "../../utilities/constants";

const CheckoutPage = () => {
  const loading = useSelector((state) => state.cart.loading);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Checkout cartItems={cartItems} cartTotal={cartTotal} />
      )}
    </>
  );
};

export default withAuth(CheckoutPage, [accessLevels.USER]);
