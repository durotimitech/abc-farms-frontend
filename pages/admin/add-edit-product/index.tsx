import React, { useState } from "react";
import AdminAddEditProduct from "../../../components/partials/admin/AddEditProduct/AddEditProduct";
import withAuth from "../../../components/hocs/RouteAuth";
import {  localStorageVars } from "../../../utilities/constants";
import { useSelector } from "react-redux";
import Spinner from "../../../components/visuals/Spin/Spin";
import AdminLayout from "../../../components/visuals/Layout/AdminLayout/AdminLayout";
import { IProduct } from "../../../store/interfaces/product";
import { IRole } from "../../../store/interfaces/auth";
import { Skeleton } from "antd";

const AdminAddEditProductPage = () => {
  const [loading, setLoading] = useState(false);

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
          <Skeleton active />
        ) : (
          <AdminAddEditProduct
            action={action}
            product={product}
            heading={heading}
            setLoading={setLoading}
          />
        )}
      </AdminLayout>
    </>
  );
};

export default withAuth(AdminAddEditProductPage, [
  IRole.ADMIN
]);
