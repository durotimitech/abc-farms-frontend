import React from "react";
import classes from "./Wishlist.module.css";
import WishlistCard from "./WishlistCard/WishlistCard";

const Wishlist = ({ wishlistItems, wishlistInDb }) => {
  return (
    <div className={`container ${classes.wishlist}`}>
      {wishlistItems.map((item) => {
        return <WishlistCard key={item._id} item={item} />;
      })}
    </div>
  );
};

export default Wishlist;
