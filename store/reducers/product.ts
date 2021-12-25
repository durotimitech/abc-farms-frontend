import actionTypes from "../action-types/product";
import { Action, State } from '../interfaces/product'

const initState = {
  products: [],
  count: 0,
  loading: false,
  product: null,
};

const reducer = (state: State = initState, action: Action): State => {
  console.log("ACTION", action);
  switch (action.type) {
    // GET PRODUCTS
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        count: action.payload.count,
        loading: false,
      };
    case actionTypes.GET_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
      };

    // GET ONE PRODUCT
    case actionTypes.GET_ONE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        product: { ...action.payload },
        loading: false,
      };
    case actionTypes.GET_ONE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
      };

    // ADD PRODUCTS
    case actionTypes.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case actionTypes.ADD_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
      };

    // EDIT PRODUCTS
    case actionTypes.EDIT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.EDIT_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
