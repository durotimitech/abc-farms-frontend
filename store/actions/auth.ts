import AuthRepository from "../../repositories/AuthRepository";
import router from "next/router";
import { getCart } from "./cart";
import { getWishlist } from "./wishlist";
import { links, localStorageVars } from "../../utilities/constants";
import { _error } from "../../utilities/_error";
import openNotification from "../../components/visuals/Notification";
import { Dispatch } from "redux";
import actionTypes from "../action-types/auth";
import { Action, Login } from "../interfaces/auth";

// LOGIN
export const login = (data: Login) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: actionTypes.LOGIN_REQUEST });

    let res = await AuthRepository.login(data);

    if (res.statusCode === 200) {
      if (res.data.emailVerified) {
        openNotification({ type: "success", message: "Login Successful!" });
        localStorage.setItem(
          localStorageVars.TOKEN,
          `Bearer ${res.data.token}`
        );
        router.push("/");
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: {
            isLoggedIn: true,
            token: res.data.token,
            firstName: res.data.firstName,
            role: res.data.role,
          },
        });
        dispatch(getCart() as any);
      } else {
        _error("Please verify your email!", "verifyEmail");
        router.push(links.VERIFYEMAIL);
        dispatch({
          type: actionTypes.LOGIN_ERROR,
        });
      }
    } else {
      dispatch({
        type: actionTypes.LOGIN_ERROR,
      });
    }
  } catch (e) {
    _error(e);
  }
};

// LOGOUT
export const logout = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: actionTypes.LOGOUT_REQUEST,
    });

    dispatch({
      type: actionTypes.LOGOUT_SUCCESS,
    });

    openNotification({
      type: "success",
      message: "Logout successful!",
    });
    router.push("/auth/login");
  } catch (e) {
    _error(e);
  }
};
