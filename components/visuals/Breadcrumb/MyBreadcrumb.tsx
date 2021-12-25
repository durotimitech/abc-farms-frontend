import React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { links } from "../../../utilities/constants";
import Head from "next/head";

interface IProps{
  breadcrumbs:string[],
  pageTitle:string
}


const MyBreadcrumb:React.FC<IProps> = ({ breadcrumbs, pageTitle }) => {
  const getLink = (route:string) => {
    switch (route) {
      case "Home":
        return links.HOME;
      case "Cart":
        return links.CART;
      case "Wishlist":
        return links.WISHLIST;
      case "Admin":
        return links.ADMIN;
      case "All Products":
        return links.ALLPRODUCTS;
      case "Login":
        return links.LOGIN;
      default:
        return links.HOME;
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle} | ABC Farms</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Breadcrumb separator=">">
        {breadcrumbs.map((crumb) => {
          return (
            <Breadcrumb.Item key={crumb}>
              <Link href={getLink(crumb)}>{crumb}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default MyBreadcrumb;
