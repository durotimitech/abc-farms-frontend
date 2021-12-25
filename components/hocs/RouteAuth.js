import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Spinner from "../visuals/Spin/Spin";

export default function withAuth(Component, accessLevelOfCurrentPage) {
  return function Auth(props) {
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userAccessLevel = useSelector((state) => state.auth.accessLevel) || 1;

    if (isLoggedIn) {
      for (let level in userAccessLevel) {
        if (accessLevelOfCurrentPage.includes(userAccessLevel[level]))
          return <Component {...props} />;
      }

      router.push("/");
      return <Spinner />;
    } else {
      router.push("/auth/login");
      return <Spinner />;
    }
  };
}
