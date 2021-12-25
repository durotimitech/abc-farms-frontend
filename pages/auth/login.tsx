import React from "react";
import Login from "../../components/partials/auth/Login";
import { useSelector } from "react-redux";
import Spinner from "../../components/visuals/Spin/Spin";
import MyBreadcrumb from "../../components/visuals/Breadcrumb/MyBreadcrumb";

const LoginPage = () => {
  let loading = useSelector((state) => state.auth.loading);
  const breadcrumbs = ["Home", "Login"];

  return (
    <div className="container">
      <MyBreadcrumb breadcrumbs={breadcrumbs} pageTitle={"Login"} />
      {loading ? <Spinner /> : <Login />}
    </div>
  );
};

export default LoginPage;
