import React from "react";
import AdminSideMenu from "../../NavigationMenu/AdminSideMenu/AdminSideMenu";
import classes from "./AdminLayout.module.css";
import Head from "next/head";

interface IProps{
  pageTitle:string
  children:JSX.Element
}

const AdminLayout:React.FC<IProps> = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle} | ABC Farms</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.admin}>
        <AdminSideMenu />
        <div className={classes.admin_body}>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
