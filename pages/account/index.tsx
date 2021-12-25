import React from "react";
import withAuth from "../../components/hocs/RouteAuth";
import AccountLayout from "../../components/visuals/Layout/AccountLayout/AccountLayout";
import { accessLevels } from "../../utilities/constants";

const AccountDashboardPage = () => {
  return (
    <>
      <AccountLayout pageTitle={"Dashboard"}></AccountLayout>
    </>
  );
};

export default withAuth(AccountDashboardPage, [accessLevels.USER]);
