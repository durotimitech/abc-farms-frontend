import React from "react";
import classes from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={`${classes.footer} container`}>
      Website designed by | 
      <Link href="https://personal-website-v.herokuapp.com/">
        Mejabi Durotimi
      </Link>
    </div>
  );
};

export default Footer;
