import actionTypes from "../action-types/auth";
import { State, Action } from '../interfaces/auth'

const initState = {
  isLoggedIn: false,
  loading: false,
};

const reducer = (state: State = initState, action: Action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...initState,
      };
    default:
      return state;
  }
};

export default reducer;
