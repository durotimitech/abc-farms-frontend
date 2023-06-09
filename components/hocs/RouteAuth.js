import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Spinner from "../visuals/Spin/Spin";
import { IRole } from "../../store/interfaces/auth";

export default function withAuth(Component, accessLevelOfCurrentPage) {
  return function Auth(props) {
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role) || IRole.USER;

    if (isLoggedIn) {
      if (accessLevelOfCurrentPage.includes(role))
        return <Component {...props} />;

      router.push("/");
      return <Spinner />;
    } else {
      router.push("/auth/login");
      return <Spinner />;
    }
  };
}
