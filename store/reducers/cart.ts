import actionTypes from "../action-types/cart";
import { State, Action } from '../interfaces/cart'

const initState = {
  loading: false,
  cartItems: [],
  cartTotal: 0,
  totalQuantity: 0,
  cartInDb: false,
};

const reducer = (state: State = initState, action: Action) => {
  switch (action.type) {
    // GET CART
    case actionTypes.GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartInDb: action.payload.cartInDb,
        totalQuantity: action.payload.totalQuantity,
        cartTotal: action.payload.cartTotal,
        loading: false,
      };
    case actionTypes.GET_CART_ERROR:
      return {
        ...state,
        loading: false,
      };

    // ADD TO CART
    case actionTypes.ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload.cartItems,
        cartInDb: action.payload.cartInDb,
        totalQuantity: action.payload.totalQuantity,
        loading: false,
      };
    case actionTypes.ADD_TO_CART_ERROR:
      return {
        ...state,
        loading: false,
      };

    // DELETE FROM CART
    case actionTypes.DELETE_FROM_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // CLEAR CART
    case actionTypes.CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...initState,
        loading: false,
      };
    case actionTypes.CLEAR_CART_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
