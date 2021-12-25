import actionTypes from "../action-types/cart";

export interface State {
    loading: boolean,
    cartItems: CartItem[],
    cartTotal: number,
    totalQuantity: number,
    cartInDb: boolean,
}

export interface CartItem {

}

// GET CART
interface GetCartRequestAction {
    type: actionTypes.GET_CART_REQUEST
}
interface GetCartSuccessAction {
    type: actionTypes.GET_CART_SUCCESS,
    payload,
}
interface GetCartErrorAction {
    type: actionTypes.GET_CART_ERROR,
}

// ADD TO CART
interface AddToCartRequestAction {
    type: actionTypes.ADD_TO_CART_REQUEST,
}
interface AddToCartSuccessAction {
    type: actionTypes.ADD_TO_CART_SUCCESS,
    payload,
}
interface AddToCartErrorAction {
    type: actionTypes.ADD_TO_CART_ERROR,
}

// DELETE FROM CART
interface DeleteFromCartRequestAction {
    type: actionTypes.DELETE_FROM_CART_REQUEST,
}

//CLEAR CART
interface ClearCartRequestAction {
    type: actionTypes.CLEAR_CART_REQUEST,
}
interface ClearCartSuccessAction {
    type: actionTypes.CLEAR_CART_SUCCESS,
}
interface ClearCartErrorAction {
    type: actionTypes.CLEAR_CART_ERROR,
}

export type Action = GetCartRequestAction | GetCartSuccessAction | GetCartErrorAction | AddToCartRequestAction | AddToCartSuccessAction | AddToCartErrorAction | DeleteFromCartRequestAction | ClearCartRequestAction | ClearCartSuccessAction | ClearCartErrorAction