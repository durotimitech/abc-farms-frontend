import React from "react";
import { Card, Button, Image, Row, Col, Space } from "antd";
import classes from "./CartCard.module.css";
import {
  MinusOutlined,
  PlusOutlined,
  HeartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../../../../store/actions/cart";

const CartCard = (props) => {
  const dispatch = useDispatch();
  const { productTitle, productImageUrl, productPrice, quantity } = props.item;
  const cartItems = props.cartItems;
  const cartInDb = props.cartInDb;

  return (
    <Card>
      <div className={classes.cart_card}>
        <div className={classes.product_info}>
          <Image
            src={productImageUrl}
            alt={productTitle}
            style={{ width: 50 }}
          />
          <div className={classes.title_wishlist}>
            <div className={classes.cart_product_title}>{productTitle}</div>
            <Space>
              <HeartOutlined />
              <DeleteOutlined
                className="red"
                onClick={() => {
                  dispatch(deleteFromCart(props.item, cartItems, cartInDb));
                }}
              />
            </Space>
          </div>
        </div>

        <div className={classes.actions}>
          <Space>
            <Button
              size="small"
              disabled={quantity <= 1}
              onClick={() => {
                dispatch(addToCart(props.item, cartItems, cartInDb, "sub"));
              }}
            >
              <MinusOutlined />
            </Button>
            <div>{quantity}</div>
            <Button
              size="small"
              onClick={() => {
                dispatch(addToCart(props.item, cartItems, cartInDb, "add"));
              }}
            >
              <PlusOutlined className={classes.increase_qty} />
            </Button>
          </Space>

          <div>₦{productPrice}</div>
          <div className={classes.cart_product_subtotal}>
            ₦{productPrice * quantity}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CartCard;
