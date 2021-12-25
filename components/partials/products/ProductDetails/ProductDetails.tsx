import React from "react";
import classes from "./ProductDetails.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../../store/actions/cart";
import Spinner from "../../../visuals/Spin/Spin";
import { useRouter } from "next/router";
import { addToWishlist } from "../../../../store/actions/wishlist";
import { Button, Image } from "antd";
import { HeartFilled } from "@ant-design/icons";

interface IProps{

product:{
  productTitle:string,
  productPrice:number,
  productDescription:string,
  productImageUrl:string,
  productQuantity:number,
}
}

const ProductDetails:React.FC<IProps> = ({product}) => {
  const {
    productTitle,
    productPrice,
    productDescription,
    productImageUrl,
    productQuantity,
  } = product;
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useSelector((state) => state.cart.loading);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartInDb = useSelector((state) => state.cart.cartInDb);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const wishlistInDb = useSelector((state) => state.cart.wishlistInDb);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={`${classes.product_details}`}>
          <div className={classes.display_image}>
            <Image src={productImageUrl} height="100%" alt={productTitle} />
          </div>
          <div className={classes.title_price}>
            <p className={classes.product_title}>{productTitle}</p>
            <p className={classes.product_price}>₦{productPrice}</p>
          </div>
          <Button
            data-testid="addToCartBtn"
            className="btn"
            onClick={() => {
              isLoggedIn
                ? dispatch(addToCart(product, cartItems, cartInDb, "add"))
                : router.push("/auth/login");
            }}
          >
            Add to cart
          </Button>
          x{productQuantity} available
          <HeartFilled
            className="fa-icon green"
            onClick={() => {
              dispatch(
                addToWishlist(product, wishlistItems, wishlistInDb)
              );
            }}
          />
          <div className={classes.product_description}>
            <h1>Product Details</h1>
            <p>{productDescription}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
