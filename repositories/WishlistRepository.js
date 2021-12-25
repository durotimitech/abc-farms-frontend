import axios from "axios";

class WishlistRepository {
  async getWishlist() {
    try {
      let payload = await axios.get(process.env.NEXT_PUBLIC_API_WISHLIST, {
        timeout: 8000,
        headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
      });

      return payload.data;
    } catch (e) {
      return e;
    }
  }

  async addToWishlist(data) {
    try {
      let payload = await axios.post(
        process.env.NEXT_PUBLIC_API_WISHLIST,
        data,
        {
          headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
        }
      );

      return payload.data;
    } catch (e) {
      return e;
    }
  }

  async editWishlist(data) {
    try {
      let payload = await axios.patch(
        process.env.NEXT_PUBLIC_API_WISHLIST,
        [{ propName: "wishlistItems", value: data.wishlistItems }],
        {
          headers: { Authorization: localStorage.getItem(localStorageVars.TOKEN) },
        }
      );

      return payload.data;
    } catch (e) {
      return e;
    }
  }
}

export default new WishlistRepository();
