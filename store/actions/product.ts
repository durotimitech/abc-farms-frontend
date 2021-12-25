import actionTypes from '../action-types/product'
import ProductRepository from "../../repositories/ProductRepository";
import router from "next/router";
import openNotification from "../../components/visuals/Notification";
import { _error } from "../../utilities/_error";
import { Dispatch } from 'redux'
import { Action, Product } from '../interfaces/product';

export const getProducts = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    const res = await ProductRepository.getProducts();

    if (res.message === "success") {
      dispatch({
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_PRODUCTS_ERROR,
      });
    }
  } catch (e) {
    _error(e);
  }
};

export const getOneProduct = (productId: number, products: Product[]) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: actionTypes.GET_ONE_PRODUCT_REQUEST,
    });

    const res = await ProductRepository.getProduct(productId, products);
    if (res) {
      dispatch({
        type: actionTypes.GET_ONE_PRODUCT_SUCCESS,
        payload: res,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ONE_PRODUCT_ERROR,
      });
    }
  } catch (e) {
    _error(e);
  }
};

export const addProduct = (products: Product[], data: Product) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: actionTypes.ADD_PRODUCT_REQUEST,
    });

    let updatedData = products;
    updatedData.push(data);

    const res = await ProductRepository.addProduct(data);
    if (res.message === "success") {
      router.push("/admin/products");
      openNotification({
        type: "success",
        message: `${data.productTitle} added successfully!`,
      });
      dispatch({
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        payload: updatedData,
      });
      dispatch(getProducts());
      localStorage.removeItem("productImageUrl");
    } else {
      dispatch({
        type: actionTypes.ADD_PRODUCT_ERROR,
      });
      dispatch(getProducts());
    }
  } catch (e) {
    _error(e);
  }
};

export const editProduct =
  (products: Product[], data: Product, deleteProduct: boolean) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch({
        type: actionTypes.EDIT_PRODUCT_REQUEST,
      });

      if (deleteProduct) {
        data.isDeleted = 1;
      }

      const updatedProducts = products.filter(
        (product) => product._id !== data._id
      );
      updatedProducts.push(data);

      const res = await ProductRepository.editProduct(data);

      if (res.message === "success") {
        router.push("/admin/products");
        openNotification({
          type: "success",
          message: `${data.productTitle} edited successfully!`,
        });
        dispatch(getProducts());
        localStorage.removeItem("productImageUrl");
      } else {
        dispatch(getProducts());
        dispatch({
          type: actionTypes.EDIT_PRODUCT_ERROR,
        });
      }
    } catch (e) {
      _error(e);
    }
  };
