export const accessLevels = {
  USER: 1,
  SALESMAN: 2,
  ADMIN: 3,
};

export const links = {
  // Home
  HOME: "/",

  // Account
  MYACCOUNT: "/account",
  CART: "/account/cart",
  WISHLIST: "/account/wishlist",
  CHANGEPASSWORD: "/account/change-password",
  CHECKOUT: "/account/checkout",
  PAYMENT: "/account/payment",
  ORDERS: "/account/orders",

  // Admin
  ADMIN: "/admin",
  ADDEDITPRODUCT: "/admin/add-edit-product",
  ADMINPRODUCTS: "/admin/products",
  ADMINORDERS: "/admin/orders",
  ACCESSCONTROL: "/admin/access-control",

  // Auth
  LOGIN: "/auth/login",
  SIGNUP: "/auth/signup",
  VERIFYEMAIL: "/auth/verify-email",
  RESENDVERIFICATIONCODE: "/auth/resend-verification-code",
  RESETPASSWORD: "/auth/reset-password",
};

export const allOrderStatus = [
  { id: 1, status: "pending" },
  { id: 2, status: "processing" },
];

export const localStorageVars = {
  ORDERIDS: "orderIds",
  TOKEN: "token",
  PRODUCTIMAGEURL: "productImageUrl",
  ADDEDITPRODUCT: "addEditProduct",
  PRODUCTDATA: "productData",
  USEREMAIL: "userEmail",
  CURRENTACCOUNTSIDEMENUKEY: "currentAccountSideMenuKey",
  CURRENTADMINSIDEMENUKEY: "currentAdminSideMenuKey",
};
