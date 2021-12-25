import React from "react";
import AdminAddEditProduct from "../../../components/partials/admin/AddEditProduct/AddEditProduct";
import withAuth from "../../../components/hocs/RouteAuth";
import { accessLevels, localStorageVars } from "../../../utilities/constants";
import { useSelector } from "react-redux";
import Spinner from "../../../components/visuals/Spin/Spin";
import AdminLayout from "../../../components/visuals/Layout/AdminLayout/AdminLayout";

const AdminAddEditProductPage = () => {
  let loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);

  let action, product, route, heading;

  if (typeof window !== "undefined") {
    action = localStorage.getItem(localStorageVars.ADDEDITPRODUCT);
    product = JSON.parse(localStorage.getItem(localStorageVars.PRODUCTDATA));
    localStorage.removeItem(localStorageVars.ADDEDITPRODUCT);
    localStorage.removeItem(localStorageVars.PRODUCTDATA);
  }

  if (action == "add") {
    heading = "Add New Product";
    route = "Add";
  } else {
    heading = "Edit Product";
    route = "Edit";
  }

  return (
    <>
      <AdminLayout pageTitle={`${route} Product`}>
        {loading ? (
          <Spinner />
        ) : (
          <AdminAddEditProduct
            products={products}
            action={action}
            product={product}
            heading={heading}
          />
        )}
      </AdminLayout>
    </>
  );
};

export default withAuth(AdminAddEditProductPage, [
  accessLevels.SALESMAN,
  accessLevels.ADMIN,
]);
