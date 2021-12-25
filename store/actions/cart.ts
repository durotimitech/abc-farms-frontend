import openNotification from "../../components/visuals/Notification";
import CartRepository from "../../repositories/CartRepository";
import { _error } from "../../utilities/_error";
import actionTypes from "../action-types/cart";
import { Dispatch } from 'redux'
import { Action } from '../interfaces/cart';

// GET CART
export const getCart = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: actionTypes.GET_CART_REQUEST });

    const res = await CartRepository.getCart();

    if (res.message === "success" && res.data !== "no cart") {
      const cartItems = JSON.parse(res.data.cartItems);
      const totalQuantity = calculateTotalQuantity(cartItems);
      const cartTotal = calculateCartTotal(cartItems);

      dispatch({
        type: actionTypes.GET_CART_SUCCESS,
        payload: {
          cartItems,
          cartInDb: true,
          totalQuantity,
          cartTotal,
        },
      }

      );
    } else if (res.data === "no cart") {
      dispatch({
        type: actionTypes.GET_CART_SUCCESS,
        payload: {
          cartItems: [],
          cartTotal: 0,
          cartInDb: false,
          totalQuantity: 0,
        }
      },
      );
      console.log("no cart");
    } else {
      dispatch({
        type: actionTypes.GET_CART_ERROR,
      });
    }
  } catch (e) {
    _error(e);
  }
};

// ADD TO CART
export const addToCart =
  (item, cartItems, cartInDb, action) => async (dispatch: Dispatch<Action>) => {
    try {
      let res;
      let newItem = {
        productId: item.productId,
        productTitle: item.productTitle,
        productPrice: item.productPrice,
        productImageUrl: item.productImageUrl,
        productQuantity: item.productQuantity,
        quantity: 0,
      };

      dispatch({
        type: actionTypes.ADD_TO_CART_REQUEST,

      });

      let existItem = cartItems.find(
        (item) => item.productId === newItem.productId
      );

      if (existItem) {
        console.log("exists");
        console.log(item);
        if (action === "add") {
          if (item.productQuantity > existItem.quantity) {
            existItem.quantity += 1;
          }
        } else {
          existItem.quantity -= 1;
        }
      } else {
        newItem.quantity = 1;
        cartItems.push(newItem);
      }

      const data = { cartItems: JSON.stringify(cartItems) };

      if (cartInDb) {
        res = await CartRepository.editCart(data);
      } else {
        res = await CartRepository.addToCart(data);
      }

      if (res.message === "success") {
        dispatch(
          {
            type: actionTypes.ADD_TO_CART_SUCCESS,
            payload: {
              cartItems,
              cartInDb: true,
            }
          },

        );
        if (action === "add") {
          openNotification({
            type: "success",
            message: `${item.productTitle} has been added to cart!`,
          });
        }
        dispatch(getCart());
      } else {
        dispatch({
          type: actionTypes.ADD_TO_CART_ERROR,
        });
      }
    } catch (e) {
      _error(e);
    }
  };

// DELETE FROM CART
export const deleteFromCart =
  (item, cartItems, cartInDb) => async (dispatch: Dispatch<Action>) => {
    try {
      let res;

      dispatch({
        type: actionTypes.DELETE_FROM_CART_REQUEST,
      });

      cartItems = cartItems.filter(
        (cartItem) => item.productId !== cartItem.productId
      );

      const data = { cartItems: JSON.stringify(cartItems) };

      res = await CartRepository.editCart(data);

      if (res.message === "success") {
        dispatch(
          {
            type: actionTypes.ADD_TO_CART_SUCCESS,
            payload: {
              cartItems,
              cartInDb: true,
            }
          },
        );
      } else {
        dispatch({
          type: actionTypes.ADD_TO_CART_ERROR,
        });
      }
    } catch (e) {
      _error(e);
    }
  };

// CLEAR CART
export const clearCart = () => async (dispatch: Dispatch<Action>) => {
  try {
    let res;

    dispatch({
      type: actionTypes.CLEAR_CART_REQUEST,
    });

    const data = { cartItems: JSON.stringify([]) };

    res = await CartRepository.editCart(data);

    if (res.message === "success") {
      dispatch({
        type: actionTypes.CLEAR_CART_SUCCESS,
      });
    } else {
      dispatch({
        type: actionTypes.CLEAR_CART_ERROR,
      });
    }
  } catch (e) {
    _error(e);
  }
};

export const calculateCartTotal = (cartItems) => {
  const total = cartItems.reduce((curTotal, item) => {
    return item.productPrice * item.quantity + curTotal;
  }, 0);
  return total;
};

export const calculateTotalQuantity = (cartItems) => {
  const total = cartItems.reduce((curTotal, item) => {
    return item.quantity + curTotal;
  }, 0);

  return total;
};
