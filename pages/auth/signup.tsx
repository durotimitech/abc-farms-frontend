import React from "react";
import Signup from "../../components/partials/auth/Signup";
import MyBreadcrumb from "../../components/visuals/Breadcrumb/MyBreadcrumb";

const signup = () => {
  const breadcrumbs = ["Home", "Create Account"];
  
  return (
    <div className="container">
      <MyBreadcrumb breadcrumbs={breadcrumbs} pageTitle={"Create Account"} />
      <Signup />
    </div>
  );
};

export default signup;
