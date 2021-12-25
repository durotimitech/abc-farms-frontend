import React from "react";
import withAuth from "../../components/hocs/RouteAuth";
import ChangePassword from "../../components/partials/account/ChangePassword";
import AccountLayout from "../../components/visuals/Layout/AccountLayout/AccountLayout";
import { accessLevels } from "../../utilities/constants";

const ChangePasswordPage = () => {
  return (
    <>
      <AccountLayout pageTitle={"Change Password"}>
        <ChangePassword />
      </AccountLayout>
    </>
  );
};

export default withAuth(ChangePasswordPage, [accessLevels.USER]);
