import axios from "axios";
import { _error } from "../utilities/_error";
import { localStorageVars } from "../utilities/constants";

class OrderRepository {
  async createOrder(data) {
    console.log("createOrder API called...");
    try {
      let res = await axios.post(process.env.NEXT_PUBLIC_API_ORDERS, data, {
        timeout: 8000,
        headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
      });
      return res.data;
    } catch (e) {
      _error(e.message, "createOrder");
      return e;
    }
  }

  async getOrders() {
    console.log("getOrders API called...");
    try {
      let payload = await axios.get(process.env.NEXT_PUBLIC_API_ORDERS, {
        timeout: 8000,
        headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
      });
      return payload.data;
    } catch (e) {
      _error(e.message, "getOrders");
      return e;
    }
  }

  async getAllOrders() {
    console.log("getAllOrders API called...");
    try {
      let payload = await axios.get(process.env.NEXT_PUBLIC_API_ALL_ORDERS, {
        timeout: 8000,
        headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
      });
      return payload.data;
    } catch (e) {
      _error(e.message, "getAllOrders");
      return e;
    }
  }

  async getSingleOrder(orderId) {
    console.log("getSingleOrder API called...");
    try {
      let payload = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ORDERS}/${orderId}`,
        {
          timeout: 8000,
          headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
        }
      );
      return payload.data;
    } catch (e) {
      _error(e.message, "getSingleOrder");
      return e;
    }
  }

  async updateOrder(data) {
    console.log("updateOrder API called...");
    try {
      let payload = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_ORDERS}/${data.orderId}`,
        data,
        {
          timeout: 8000,
          headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
        }
      );
      return payload.data;
    } catch (e) {
      _error(e.message, "updateOrder");
      return e;
    }
  }
}

export default new OrderRepository();
