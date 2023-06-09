import React from "react";
import withAuth from "../../components/hocs/RouteAuth";
import AccountLayout from "../../components/visuals/Layout/AccountLayout/AccountLayout";
import { IRole } from "../../store/interfaces/auth";

const AccountDashboardPage = () => {
  return (
    <>
      <AccountLayout pageTitle={"Dashboard"}>{}</AccountLayout>
    </>
  );
};

export default withAuth(AccountDashboardPage, [IRole.USER, IRole.ADMIN]);
