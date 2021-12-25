import axios from "axios";
import { localStorageVars } from "../utilities/constants";
import { _error } from "../utilities/_error";

class CartRepository {
  async getCart() {
    console.log('getCart API called...');
    try {
      let payload = await axios.get(process.env.NEXT_PUBLIC_API_CARTS, {
        headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
      });

      return payload.data;
    } catch (e) {
      _error(e.message, "getCart");
      return e;
    }
  }

  async addToCart(data) {
    console.log('addToCart API called...');
    try {
      let payload = await axios.post(process.env.NEXT_PUBLIC_API_CARTS, data, {
        headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
      });

      return payload.data;
    } catch (e) {
      _error(e.message, "addToCart");
      return e;
    }
  }

  async editCart(data) {
    console.log('editCart API called...');
    try {
      let payload = await axios.patch(process.env.NEXT_PUBLIC_API_CARTS, data, {
        headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
      });

      return payload.data;
    } catch (e) {
      _error(e.message, "editCart");
      return e;
    }
  }
}

export default new CartRepository();
