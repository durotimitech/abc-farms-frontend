import axios from "axios";
import { localStorageVars } from "../utilities/constants";
import { _error } from "../utilities/_error";

class AuthRepository {
  async login(data) {
    console.log("Login API called...");
    try {
      let payload = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/users/login`,
        data,
        {
          timeout: 8000,
        }
      );
      return payload.data;
    } catch (e) {
      _error(e.message, "login");
      return e;
    }
  }

  async createAccount(data) {
    console.log("createAccount API called...");
    try {
      let payload = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/users/register`,
        data,
        {
          timeout: 8000,
        }
      );

      return payload.data;
    } catch (e) {
      _error(e.message, "signup");
      return e;
    }
  }

  async verifyEmail(data) {
    console.log("verifyEmail API called...");
    try {
      let payload = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_USERS}/verify-email`,
        data,
        {
          timeout: 8000,
        }
      );
      return payload.data;
    } catch (e) {
      _error(e.message, "verifyEmail");
      return e;
    }
  }

  async resendVerificationCode(data) {
    console.log("resendVerificationCode API called...");
    try {
      let payload = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/users/resend-verification-email`,
        data,
        {
          timeout: 8000,
        }
      );
      return payload.data;
    } catch (e) {
      _error(e.message, "resendVerification");
      return e;
    }
  }

  async changePassword(data) {
    console.log("changePassword API called...");
    try {
      let payload = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/users/change-password`,
        data,
        {
          timeout: 8000,
          headers: {
            Authorization: localStorage.getItem(
              localStorageVars.TOKEN
            ),
          },
        }
      );
      return payload.data;
    } catch (e) {
      _error(e.message, "changePassword");
      return e;
    }
  }

  async resetPassword(data) {
    console.log("resetPassword API called...");
    try {
      let payload = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/users/reset-password`,
        data,
        {
          timeout: 8000,
        }
      );
      return payload.data;
    } catch (e) {
      _error(e.message, "resetPassword");
      return e;
    }
  }
}

export default new AuthRepository();
