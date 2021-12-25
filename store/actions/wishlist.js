import WishlistRepository from "../../repositories/WishlistRepository";
import { logout } from "./auth";
import openNotification from "../../components/visuals/Notification";
import { _error } from "../../utilities/_error";

export const actionTypes = {
  // GET WISHLIST
  GET_WISHLIST_REQUEST: "GET_WISHLIST_REQUEST",
  GET_WISHLIST_SUCCESS: "GET_WISHLIST_SUCCESS",
  GET_WISHLIST_ERROR: "GET_WISHLIST_ERROR",

  // ADD TO CART
  ADD_TO_WISHLIST_REQUEST: "ADD_TO_WISHLIST_REQUEST",
  ADD_TO_WISHLIST_SUCCESS: "ADD_TO_WISHLIST_SUCCESS",
  ADD_TO_WISHLIST_ERROR: "ADD_TO_WISHLIST_ERROR",

  // DELETE FROM CART
  DELETE_FROM_WISHLIST_REQUEST: "DELETE_FROM_WISHLIST_REQUEST",
  DELETE_FROM_WISHLIST_SUCCESS: "DELETE_FROM_WISHLIST_SUCCESS",
  DELETE_FROM_WISHLIST_ERROR: "DELETE_FROM_WISHLIST_ERROR",
};

// GET WISHLIST
const getWishlistRequest = () => {
  return { type: actionTypes.GET_WISHLIST_REQUEST };
};

const getWishlistSuccess = (payload) => {
  return {
    type: actionTypes.GET_WISHLIST_SUCCESS,
    payload,
  };
};

const getWishlistError = () => {
  return {
    type: actionTypes.GET_WISHLIST_ERROR,
  };
};

// ADD TO WISHLIST
const addToWishlistRequest = () => {
  return {
    type: actionTypes.ADD_TO_WISHLIST_REQUEST,
  };
};

const addToWishlistSuccess = (payload) => {
  return {
    type: actionTypes.ADD_TO_WISHLIST_SUCCESS,
    payload,
  };
};

const addToWishlistError = () => {
  return {
    type: actionTypes.ADD_TO_WISHLIST_ERROR,
  };
};

// DELETE FROM WISHLIST
const deleteFromWishlistRequest = () => {
  return {
    type: actionTypes.DELETE_FROM_WISHLIST_REQUEST,
  };
};

const deleteFromWishlistSuccess = (payload) => {
  return {
    type: actionTypes.DELETE_FROM_WISHLIST_SUCCESS,
    payload,
  };
};

const deleteFromWishlistError = () => {
  return {
    type: actionTypes.DELETE_FROM_WISHLIST_ERROR,
  };
};

// GET WISHLIST
export const getWishlist = () => async (dispatch) => {
  try {
    dispatch(getWishlistRequest());

    const res = await WishlistRepository.getWishlist();

    if (res.message === "success" && res.data !== "no wishlist") {
      dispatch(
        getWishlistSuccess({
          wishlistItems: JSON.parse(res.wishList[0].wishlistItems),
          wishlistInDb: true,
        })
      );
    } else if (res.data === "no wishlist") {
      dispatch(
        getWishlistSuccess({
          wishlistItems: [],
          wishlistInDb: false,
        })
      );
      console.log("no wishlist");
    } else {
      dispatch(getWishlistError());
      _error(res);
    }
  } catch (e) {
    _error(e);
  }
};

// ADD TO WISHLIST
export const addToWishlist =
  (item, wishlistItems, wishlistInDb) => async (dispatch) => {
    try {
      let newItem = {
        productTitle: item.productTitle,
        _id: item._id,
        productPrice: item.productPrice,
      };

      let res;

      dispatch(addToWishlistRequest());

      let existItem = wishlistItems.find((item) => item._id === newItem._id);

      const data = { wishlistItems: JSON.stringify(wishlistItems) };

      if (!existItem) {
        wishlistItems.push(newItem);
        if (wishlistInDb) {
          res = await WishlistRepository.editWishlist(data);
        } else {
          res = await WishlistRepository.addToWishlist(data);
        }
        if (res.message === "success") {
          dispatch(
            addToWishlistSuccess({
              wishlistItems,
              wishlistInDb: true,
            })
          );

          openNotification({
            type: "success",
            message: `${item.productTitle} has been added to wishlist!`,
          });
        } else {
          if (res.message === "Request failed with status code 401") {
            _error('"Please Log in"');
            dispatch(logout());
          }
          dispatch(addToWishlistError());
          _error(res);
        }
      } else {
        console.log("already in db");
      }
    } catch (e) {
      _error(e);
    }
  };
