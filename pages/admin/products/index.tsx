import React from "react";
import Products from "../../../components/partials/admin/Products/Products";
import { useSelector } from "react-redux";
import Spinner from "../../../components/visuals/Spin/Spin";
import withAuth from "../../../components/hocs/RouteAuth";
import { accessLevels } from "../../../utilities/constants";
import AdminLayout from "../../../components/visuals/Layout/AdminLayout/AdminLayout";

const AdminProductsPage = () => {
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);

  return (
    <>
      <AdminLayout pageTitle={"Products"}>
        <>{loading ? <Spinner /> : <Products products={products} />}</>
      </AdminLayout>
    </>
  );
};

export default withAuth(AdminProductsPage, [accessLevels.SALESMAN,accessLevels.ADMIN]);
