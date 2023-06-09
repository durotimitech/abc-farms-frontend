import actionTypes from "../action-types/auth";

export interface State {
  isLoggedIn: boolean;
  loading: boolean;
}

export interface Login {
  email: string;
  password: string;
}

export enum IRole {
    USER = "USER",
    ADMIN = "ADMIN",
}

export interface AuthData {
  isLoggedIn: boolean;
  token: string;
  firstName: string;
  role: IRole
}

interface LoginRequestAction {
  type: actionTypes.LOGIN_REQUEST;
}
interface LoginSuccessAction {
  type: actionTypes.LOGIN_SUCCESS;
  payload: AuthData;
}
interface LoginErrorAction {
  type: actionTypes.LOGIN_ERROR;
}
interface LogoutRequestAction {
  type: actionTypes.LOGOUT_REQUEST;
}
interface LogoutSuccessAction {
  type: actionTypes.LOGOUT_SUCCESS;
}

export type Action =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutRequestAction
  | LogoutSuccessAction;
