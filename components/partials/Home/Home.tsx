import React from "react";
import classes from "./Home.module.css";
import Image from "next/image";
import ProductsList from "../products/ProductsList/ProductsList";

const Home = () => {
  return (
    <>
      <div className={classes.header}>
        <Image src="/images/logo.png" width="150" height="100" alt="Logo" />
      </div>
      <ProductsList />
    </>
  );
};

export default Home;
