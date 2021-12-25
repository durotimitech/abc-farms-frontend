import { actionTypes } from "../actions/wishlist";

const initState = {
  loading: false,
  wishlistItems: [],
  wishlistInDb: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    // GET WISHLIST
    case actionTypes.GET_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlistItems: action.payload.wishlistItems,
        wishlistInDb: action.payload.wishlistInDb,
        loading: false,
      };
    case actionTypes.GET_WISHLIST_ERROR:
      return {
        ...state,
        loading: false,
      };
    // ADD TO WISHLIST
    case actionTypes.ADD_TO_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlistItems: action.payload.wishlistItems,
        wishlistInDb: action.payload.wishlistInDb,
        loading: false,
      };
    case actionTypes.ADD_TO_WISHLIST_ERROR:
      return {
        ...state,
        loading: false,
      };
    // DELETE FROM WISHLIST
    case actionTypes.DELETE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlistItems: action.payload.wishlistItems,
        wishlistInDb: action.payload.wishlistInDb,
        loading: false,
      };
    case actionTypes.DELETE_FROM_WISHLIST_ERROR:
      return {
        ...state,
        loading: false,

      };
    default:
      return state;
  }
};

export default reducer;
