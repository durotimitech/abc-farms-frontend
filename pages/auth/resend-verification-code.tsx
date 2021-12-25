import React from "react";
import ResendVerificationCode from "../../components/partials/auth/ResendVerificationCode";
import MyBreadcrumb from "../../components/visuals/Breadcrumb/MyBreadcrumb";

const ResendVerificationCodePage = () => {
  const breadcrumbs = ["Home", "Login", "Resend Verification Code"];
  
  return (
    <div className="container">
      <MyBreadcrumb
        breadcrumbs={breadcrumbs}
        pageTitle={"Resend Verification Code"}
      />
      <ResendVerificationCode />
    </div>
  );
};

export default ResendVerificationCodePage;
