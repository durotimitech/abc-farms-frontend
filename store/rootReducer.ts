import { combineReducers } from "redux";
import auth from "./reducers/auth";
import cart from "./reducers/cart";
import wishlist from "./reducers/wishlist";

const rootReducer = combineReducers({
  auth,
  cart,
  wishlist,
});

export default rootReducer;
