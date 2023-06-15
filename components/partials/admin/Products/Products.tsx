import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row } from "antd";
import router from "next/router";
import React from "react";
import { links, localStorageVars } from "../../../../utilities/constants";
import ProductsTable from "./ProductsTable/ProductsTable";
import { IProduct } from "../../../../store/interfaces/product";

interface IProps{
  products:IProduct[],
  totalCount:number,
  pageNumber:number,
  pageSize:number,
  setPageSize:(pageSize:number)=>void,
  setPageNumber:(pageNumber:number)=>void
}

const Products:React.FC<IProps> = ({ products, totalCount,pageNumber, pageSize, setPageSize,setPageNumber }) => {
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

      <ProductsTable products={products} totalCount={totalCount} pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} />
    </div>
  );
};

export default Products;
