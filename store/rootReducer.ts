import { combineReducers } from "redux";
import product from "./reducers/product";
import auth from "./reducers/auth";
import cart from "./reducers/cart";
import wishlist from "./reducers/wishlist";

const rootReducer = combineReducers({
  product,
  auth,
  cart,
  wishlist,
});

export default rootReducer;
