import React from "react";
import withAuth from "../../components/hocs/RouteAuth";
import Cart from "../../components/partials/account/cart/Cart";
import { useSelector } from "react-redux";
import Spinner from "../../components/visuals/Spin/Spin";
import { accessLevels } from "../../utilities/constants";
import MyBreadcrumb from "../../components/visuals/Breadcrumb/MyBreadcrumb";
import EmptyCart from "../../components/shared/EmptyContent/EmptyCart/EmptyCart";

const CartPage = () => {
  const breadcrumbs = ["Home", "Cart"];
  const loading = useSelector((state) => state.cart.loading);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const cartInDb = useSelector((state) => state.cart.cartInDb);

  return (
    <div className="container">
      <MyBreadcrumb breadcrumbs={breadcrumbs} pageTitle={"Cart"} />
      {loading ? (
        <Spinner />
      ) : cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <Cart cartItems={cartItems} cartTotal={cartTotal} cartInDb={cartInDb} />
      )}
    </div>
  );
};

export default withAuth(CartPage, [accessLevels.USER]);
