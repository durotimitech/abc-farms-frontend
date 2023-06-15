import React, { useEffect, useState } from "react";
import AdminDashboard from "../../components/partials/admin/AdminDashboard/AdminDashboard";
import { useSelector } from "react-redux";
import Spinner from "../../components/visuals/Spin/Spin";
import withAuth from "../../components/hocs/RouteAuth";
import AdminRepository from "../../repositories/AdminRepository";
import AdminLayout from "../../components/visuals/Layout/AdminLayout/AdminLayout";
import OrderRepository from "../../repositories/OrderRepository";
import { IRole } from "../../store/interfaces/auth";
import { Skeleton } from "antd";
import ProductRepository from "../../repositories/ProductRepository";

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [userCount, setUsersCount] = useState(0);
  const [totalOrderCount, setTotalOrders] = useState(0);
  const [productCount, setProductCount] = useState(0);

  const getUsers = async () => {
    const res = await AdminRepository.getUsers();

    if (res.statusCode === 200) {
      setUsersCount(res.data.totalCount);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
 
  const getProducts = async () => {
    const res = await ProductRepository.getProducts(1, 0);

    if (res.statusCode === 200) {
      setProductCount(res.data.totalCount);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    const res = await OrderRepository.getAllOrders();

    if (res.statusCode === 200) {
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
    getProducts()
  }, []);

  return (
    <>
      <AdminLayout pageTitle={"Dashboard"}>
        {loading ? (
          <Skeleton active />
        ) : (
          <AdminDashboard
            productCount={productCount}
            userCount={userCount}
            totalOrderCount={totalOrderCount}
          />
        )}
      </AdminLayout>
    </>
  );
};

export default withAuth(AdminDashboardPage, [IRole.USER, IRole.ADMIN]);
