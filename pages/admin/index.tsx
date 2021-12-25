import React, { useEffect, useState } from "react";
import AdminDashboard from "../../components/partials/admin/AdminDashboard/AdminDashboard";
import { useSelector } from "react-redux";
import Spinner from "../../components/visuals/Spin/Spin";
import withAuth from "../../components/hocs/RouteAuth";
import { accessLevels } from "../../utilities/constants";
import UserRepository from "../../repositories/UserRepository";
import AdminLayout from "../../components/visuals/Layout/AdminLayout/AdminLayout";
import OrderRepository from "../../repositories/OrderRepository";

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [userCount, setUsersCount] = useState(0);
  const [totalOrderCount, setTotalOrders] = useState(0);
  const products = useSelector((state) => state.product.allProducts);
  const productCount = useSelector((state) => state.product.count);

  const getUsers = async () => {
    const res = await UserRepository.getUsers();

    if (res.message === "success") {
      setUsersCount(res.data.count);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    const res = await OrderRepository.getAllOrders();

    if (res.message === "success") {
      setTotalOrders(res.data.count);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
    getOrders();
  }, []);

  return (
    <>
      <AdminLayout pageTitle={"Dashboard"}>
        {loading ? (
          <Spinner />
        ) : (
          <AdminDashboard
            products={products}
            productCount={productCount}
            userCount={userCount}
            totalOrderCount={totalOrderCount}
          />
        )}
      </AdminLayout>
    </>
  );
};

export default withAuth(AdminDashboardPage, [accessLevels.SALESMAN,accessLevels.ADMIN]);
