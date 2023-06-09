import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import classes from "./ProductsList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../store/actions/product";
import Spinner from "../../../visuals/Spin/Spin";
import NoProducts from "../../../shared/EmptyContent/NoProducts/NoProducts";

const ProductsList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const renderProductList =(): JSX.Element[]=>{
    return products &&
      products.map((product) => {
        if (product.productQuantity > 1) {
          return (
            <ProductCard
              key={product.productId}
              product={product}
              products={products}
            />
          );
        }
      })
  }

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : products && products.length < 1 ? (
        <NoProducts />
      ) : (
        <div className={classes.products_list}>
         {renderProductList()}
        </div>
      )}
    </>
  );
};

export default ProductsList;
