import React from "react";
import ProductDetails from "../../components/partials/products/ProductDetails/ProductDetails";
import Spinner from "../../components/visuals/Spin/Spin";
import { useSelector } from "react-redux";
import MyBreadcrumb from "../../components/visuals/Breadcrumb/MyBreadcrumb";

const ProductDetailsPage = () => {
  let loading = useSelector((state) => state.product.loading);
  const product = useSelector((state) => state.product.product);
  const products = useSelector((state) => state.product.products);

  const breadcrumbs = ["Home", `${product.productTitle}`];

  

  return (
    <div className="container">
      <MyBreadcrumb
        breadcrumbs={breadcrumbs}
        pageTitle={`${product.productTitle}`}
      />

      {!loading ? (
        <ProductDetails product={product} products={products} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ProductDetailsPage;
