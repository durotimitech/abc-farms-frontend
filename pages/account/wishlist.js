import React from "react";
import withAuth from "../../components/hocs/RouteAuth";
import { accessLevels } from "../../utilities/constants";
import Wishlist from "../../components/partials/wishlist/Wishlist";
import { useSelector } from "react-redux";
import Spinner from "../../components/visuals/Spin/Spin";
import MyBreadcrumb from "../../components/visuals/Breadcrumb/MyBreadcrumb";

const WishlistPage = () => {
  const breadcrumbs = ["Home", "Wishlist"];
  const loading = useSelector((state) => state.wishlist.loading);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistInDb = useSelector((state) => state.wishlist.wishlistInDb);

  return (
    <>
      <MyBreadcrumb breadcrumbs={breadcrumbs} />

      {loading ? (
        <Spinner />
      ) : wishlistItems.length === 0 ? (
        <h1>No Items in wishlist</h1>
      ) : (
        <Wishlist wishlistItems={wishlistItems} wishlistInDb={wishlistInDb} />
      )}
    </>
  );
};

export default withAuth(WishlistPage, [accessLevels.USER]);
