import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row } from "antd";
import router from "next/router";
import React from "react";
import { links, localStorageVars } from "../../../../utilities/constants";
import ProductsTable from "./ProductsTable/ProductsTable";

interface IProps{
  products:[],
}

const Products:React.FC<IProps> = ({ products }) => {
  const goToAddProductPage = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageVars.ADDEDITPRODUCT, "add");
      localStorage.setItem(localStorageVars.PRODUCTDATA, JSON.stringify({}));
      router.push(links.ADDEDITPRODUCT);
    }
  };

  return (
    <div>
      <Row>
        <Col span={15}>
          <h1> Products</h1>
        </Col>
        <Col span={4}>
          <Button icon={<PlusCircleOutlined />} onClick={goToAddProductPage}>
            Add Product
          </Button>
        </Col>
      </Row>
      <Divider />
      <br />

      <ProductsTable products={products} />
    </div>
  );
};

export default Products;
