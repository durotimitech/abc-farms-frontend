import React from "react";
import VerifyEmail from "../../components/partials/auth/VerifyEmail/VerifyEmail";
import MyBreadcrumbs from "../../components/visuals/Breadcrumb/MyBreadcrumb";

const VerifyEmailPage = () => {
  const breadcrumbs = ["Home", "Login", "Verify Email"];

  return (
    <div className="container">
      <MyBreadcrumbs breadcrumbs={breadcrumbs} pageTitle={"Verify Email"} />
      <VerifyEmail />
    </div>
  );
};

export default VerifyEmailPage;
