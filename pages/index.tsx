import React from "react";
import Home from "../components/partials/Home/Home";
import MyBreadcrumb from "../components/visuals/Breadcrumb/MyBreadcrumb";

// The products are being fetched upon initial render in _app.js
const HomePage = () => {
  const breadcrumbs = ["Home"];

  return (
    <div className="container">
      <MyBreadcrumb breadcrumbs={breadcrumbs} pageTitle={"Home"} />
      <Home />
    </div>
  );
};

export default HomePage;
