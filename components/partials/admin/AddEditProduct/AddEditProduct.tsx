import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, InputNumber, Button, Row, Col } from "antd";
import { addProduct, editProduct } from "../../../../store/actions/product";
import ProductImages from "./ProductImages/ProductImages";
import classes from "./AddEditProduct.module.css";
import { localStorageVars } from "../../../../utilities/constants";

interface IProps{
products:any[],
product:any,
action:string,
heading:string,
}

const AdminAddEditProduct:React.FC<IProps> = ({ products, action, product, heading }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    productTitle: "",
    productPrice: "",
    productQuantity: "",
    productDescription: "",
    productImageUrl: "",
  });
  const [form] = Form.useForm();

  useEffect(() => {
    product
      ? setProductData(product)
      : setProductData({
          productTitle: "",
          productPrice: "",
          productQuantity: "",
          productImageUrl: "",
        });
  }, [product]);

  const handleSubmit = (data) => {
    const productImageUrl = localStorage.getItem(
      localStorageVars.PRODUCTIMAGEURL
    );
    if (productImageUrl) {
      data.productImageUrl = productImageUrl;
    } else {
      data.productImageUrl =
        "https://static.thenounproject.com/png/3237447-200.png";
    }
    localStorage.removeItem(localStorageVars.PRODUCTIMAGEURL);
    action == "add" ? handleAddNewProduct(data) : handleEditProduct(data);
  };

  const handleAddNewProduct = (data) => {
    dispatch(addProduct(products, data));
  };

  const handleEditProduct = (data) => {
    data.productId = productData.productId;

    dispatch(editProduct(products, data));
  };

  return (
    <div className={`container ${classes.body}`}>
      <Form
        className={classes.content}
        form={form}
        name="add_edit_product"
        onFinish={handleSubmit}
        fields={[
          { name: ["productTitle"], value: productData.productTitle },
          { name: ["productPrice"], value: productData.productPrice },
          { name: ["productQuantity"], value: productData.productQuantity },
          {
            name: ["productDescription"],
            value: productData.productDescription,
          },
        ]}
      >
        <h1>{heading}</h1>
        {/* Title */}
        <Form.Item
          name="productTitle"
          label="Title"
          rules={[{ required: true, message: "Please input a product title!" }]}
        >
          <Input />
        </Form.Item>
        <Row>
          <Col span={12}>
            {/* Price */}
            <Form.Item
              name="productPrice"
              label="Price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Quantity */}
            <Form.Item
              name="productQuantity"
              label="Quantity"
              rules={[
                { required: true, message: "Please input the quantity!" },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        {/* Description */}
        <Form.Item
          name="productDescription"
          label="Description"
          rules={[{ required: true, message: "Please input the quantity!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        {/* Image Upload */}
        <ProductImages preview={productData.productImageUrl} />

        {/* Submit Btn */}
        <Form.Item>
          <Button block htmlType="submit">
            {action == "edit" ? "Save Changes" : "Add New Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminAddEditProduct;
