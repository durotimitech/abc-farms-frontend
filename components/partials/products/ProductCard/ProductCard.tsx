import React from "react";
import Link from "next/link";
import { Card, Image } from "antd";
const { Meta } = Card;
import { useDispatch } from "react-redux";
import { getOneProduct } from "../../../../store/actions/product";
import classes from "./ProductCard.module.css";

interface IProps{
  product:{
    productId:number
    productImageUrl:string
    productTitle:string
    productPrice:number
  },
  products:[]
}

const ProductCard: React.FC<IProps> = ({product,products}) => {
  const dispatch = useDispatch();
  const { productId, productImageUrl, productTitle, productPrice } =
    product;

  return (
    <Link href={`/products/${productId}`} passHref data-testid="productCard">
      <a>
        <Card
          onClick={() => dispatch(getOneProduct(productId, products))}
          hoverable
          cover={
            <Image
              className={classes.product_img}
              preview={false}
              src={productImageUrl}
              alt={productTitle}
            />
          }
        >
          <Meta
            title={productTitle}
            description={`₦${productPrice.toLocaleString("en-US")}`}
          />
        </Card>
      </a>
    </Link>
  );
};

export default ProductCard;
