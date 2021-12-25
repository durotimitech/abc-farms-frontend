import React from "react";
import ResetPassword from "../../components/partials/auth/ResetPassword";
import MyBreadcrumb from "../../components/visuals/Breadcrumb/MyBreadcrumb";

const ResetPasswordPage = () => {
  const breadcrumbs = ["Home", "Login", "Reset Password"];
  return (
    <div className="container">
      <MyBreadcrumb breadcrumbs={breadcrumbs} pageTitle={"Reset Password"} />
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
