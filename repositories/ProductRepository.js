import axios from "axios";
import { _error } from "../utilities/_error";
import { localStorageVars } from "../utilities/constants";

class ProductRepository {
  async getProducts() {
    console.log("getProducts API called...");
    try {
      let payload = await axios.get(process.env.NEXT_PUBLIC_API_PRODUCTS, {
        timeout: 8000,
      });
      return payload.data;
    } catch (e) {
      _error(e.message, "getProducts");
      return e;
    }
  }

  async getProduct(productId, products) {
    console.log("getProduct API called...");
    try {
      const product = products.find((product) => {
        return product.productId === productId;
      });

      return product;
    } catch (e) {
      _error(e.message, "getProduct");
      return e;
    }
  }

  async addProduct(data) {
    console.log("addProduct API called...");
    try {
      let res = await axios.post(process.env.NEXT_PUBLIC_API_PRODUCTS, data, {
        headers: {
          timeout: 8000,
          Authorization: localStorage.getItem(localStorageVars.TOKEN),
        },
      });
      return res.data;
    } catch (e) {
      _error(e.message, "addProduct");
      return e;
    }
  }

  async editProduct(data) {
    console.log("editProduct API called...");
    try {
      let res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_PRODUCTS}/${data.productId}`,
        data,
        {
          timeout: 8000,
          headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
        }
      );
      return res.data;
    } catch (e) {
      _error(e.message, "editProduct");
      return e;
    }
  }
}

export default new ProductRepository();
