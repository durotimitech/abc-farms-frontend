import React from "react";
import AccountSideMenu from "../../NavigationMenu/AccountSideMenu/AccountSideMenu";
import classes from "./AccountLayout.module.css";
import Head from "next/head";

const AccountLayout = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle} | ABC Farms</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={classes.account}>
        <AccountSideMenu />
        <div className={classes.account_body}>{children}</div>
      </div>
    </>
  );
};

export default AccountLayout;
