import LogRocket from "logrocket";
import openNotification from "../components/visuals/Notification";
import { logout } from "../store/actions/auth";
import { store } from "../store/store";

export const _error = (error, from) => {

  let message;
  if (error === "Request failed with status code 500") {
    message = "Please log in";
    store.dispatch(logout());

  } else if (error === "Request failed with status code 401") {
    message = "Please log in";
  } else if (error === "Request failed with status code 403") {
    message = "You are not authorized to perform this action!";
  } else if (error === "timeout of 8000ms exceeded") {
    message = "Please check your network connection!";
  } else {
    switch (from) {
      // Auth
      case "login":
        loginError(error);
        break;
      case "signup":
        signupError(error);
        break;
      case "verifyEmail":
        verifyEmailError(error);
        break;
      case "resendVerification":
        resendVerificationError(error);
        break;
      case "changePassword":
        changePasswordError(error);
        break;

      // Admin
      case "adminUpdateUser":
        adminUpdateUserError(error);
        break;

      // Orders
      case "getAllOrders":
        getAllOrdersError(error);
        break;
      case "getSingleOrder":
        getSingleOrderError(error);
        break;
      case "createOrder":
        createOrderError(error);
        break;
      case "updateOrder":
        updateOrderError(error);
        break;
      case "getProducts":
        getProductsError(error);
        break;
      case "getProduct":
        getOneProductError(error);
        break;
      case "addProduct":
        addProductError(error);
        break;
      case "editProduct":
        editProductError(error);
        break;
      case "getCart":
        getCartError(error);
        break;
      case "addToCart":
        addToCartError(error);
        break;
      case "editCart":
        editCartError(error);
        break;
      default:
        message = error;
    }
  }

  if (message) {
    openNotification({ type: "error", message });
  }
  LogRocketLogger(error);
  console.log(`${from}, Error: ${error}`);
};

export const LogRocketLogger = (error) => {
  LogRocket.captureException(error);
};

// Auth
const loginError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 400":
      message = "Email or password incorrect!";
      break;
    default:
      message = e;
      break;
  }
  openNotification({ type: "error", message });
};

const signupError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 409":
      message = "This account already exists!";
      break;
    default:
      message = e;
      break;
  }
  openNotification({ type: "error", message });
};

const verifyEmailError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 400":
      message = "The verification code is not valid!";
      break;
    default:
      message = e;
      break;
  }
  openNotification({ type: "error", message });
};

const resendVerificationError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 400":
      message = "The verification code is not valid!";
      break;
    default:
      message = e;
      break;
  }
  openNotification({ type: "error", message });
};

const changePasswordError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 400":
      message = "Old Password is incorrect!";
      break;
    default:
      message = e;
      break;
  }
  openNotification({ type: "error", message });
};

const adminUpdateUserError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 400":
      message = "This user is not registered!!";
      break;
    default:
      message = e;
      break;
  }
  openNotification({ type: "error", message });
};

// Orders
const getAllOrdersError = (e) => {
  let message;

  openNotification({ type: "error", message: `from getAllOrders, ${e}` });
};

const getSingleOrderError = (e) => {
  let message;

  openNotification({ type: "error", message: `from getSingleOrder, ${e}` });
};

const createOrderError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 400":
      message = "Items in your cart have changed! Please check cart!";
      break;
    case "Request failed with status code 404":
      message = "This product is no longer available!";
      break;
    default:
      message = e;
      break;
  }

  openNotification({ type: "error", message });
};

const updateOrderError = (e) => {
  let message;
  openNotification({ type: "error", message: `${e} updateOrder` });
};

const getProductsError = (e) => {
  let message;

  openNotification({ type: "error", message: `from getProducts, ${e}` });
};

const getOneProductError = (e) => {
  _error(e + "from get product");
};

const addProductError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 409":
      message = "Product already exists!";
      break;
    default:
      message = e;
      break;
  }
  openNotification({ type: "error", message });
};

const editProductError = (e) => {
  let message;
  switch (e) {
    case "Request failed with status code 409":
      message = "Product already exists!";
      break;
    default:
      message = e;
      break;
  }
  openNotification({ type: "error", message });
};

const getCartError = (e) => {
  _error(e + "from get cart");
};

const addToCartError = (e) => {
  let message;
  openNotification({ type: "error", message: `from addToCart, ${e}` });
};

const editCartError = (e) => {
  openNotification({ type: "error", message: `from editCart, ${e}` });
};
