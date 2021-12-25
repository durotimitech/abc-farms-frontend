import React from "react";
import NavigationMenu from "../NavigationMenu/TopNavigationMenu/TopNavigationMenu";
import Footer from "../Footer/Footer";
import Head from "next/head";
import { useSelector } from "react-redux";
import LogRocket from "logrocket";

const Layout = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  LogRocket.identify(auth.userId, {
    name: auth.firstName + " " + auth.lastName,
    email: auth.email,
  });

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <NavigationMenu />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
