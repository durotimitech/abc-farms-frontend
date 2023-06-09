import axios from "axios";
import { localStorageVars } from "../utilities/constants";
import { _error } from "../utilities/_error";

class AdminRepository {
  async getUsers() {
    console.log("getUsers API called...");
    try {
      let payload = await axios.get(`${process.env.NEXT_PUBLIC_API}/admin/users`, {
        headers: {
          Authorization: localStorage.getItem(localStorageVars.TOKEN),
        },
      });

      return payload.data;
    } catch (e) {
      _error(e.message, "getUsers");
      return e;
    }
  }

  async getAdmins() {
    console.log("getAdmins API called...");
    try {
      let payload = await axios.get(
        `${process.env.NEXT_PUBLIC_API_USERS}/get-admins`,
        {
          headers: {
            Authorization: localStorage.getItem(localStorageVars.TOKEN),
          },
        }
      );

      return payload.data;
    } catch (e) {
      _error(e.message, "getAdmins");
      return e;
    }
  }

  async adminUpdateUser(data) {
    console.log("updateUser API called...");
    try {
      let payload = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_USERS}/admin-update-user`,
        data,
        {
          headers: {
            Authorization: localStorage.getItem(localStorageVars.TOKEN),
          },
        }
      );

      return payload.data;
    } catch (e) {
      _error(e.message, "adminUpdateUser");
      return e;
    }
  }
}

export default new AdminRepository();
