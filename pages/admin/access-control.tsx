import React, { useEffect, useState } from "react";
import AccessControl from "../../components/partials/admin/AccessControl/AccessControl";
import AdminLayout from "../../components/visuals/Layout/AdminLayout/AdminLayout";
import Spinner from "../../components/visuals/Spin/Spin";
import UserRepository from "../../repositories/UserRepository";
import { accessLevels } from "../../utilities/constants";
import withAuth from "../../components/hocs/RouteAuth";

const AccessControlPage = () => {
  const [admins, setAdmins] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAdmins = async () => {
    setLoading(true);
    const res = await UserRepository.getAdmins();
    if (res.message === "success") setAdmins(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <>
      <AdminLayout pageTitle={"Manage Access"}>
        {loading ? <Spinner /> : <AccessControl admins={admins} />}
      </AdminLayout>
    </>
  );
};

export default withAuth(AccessControlPage, [accessLevels.ADMIN]);
