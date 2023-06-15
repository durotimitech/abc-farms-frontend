import React, { useEffect, useState, useRef } from "react";
import { Form, Input, InputNumber, Button, Row, Col } from "antd";
import ProductImages from "./ProductImages/ProductImages";
import classes from "./AddEditProduct.module.css";
import { links, localStorageVars } from "../../../../utilities/constants";
import { IProduct } from "../../../../store/interfaces/product";
import ProductRepository from "../../../../repositories/ProductRepository";
import openNotification from "../../../visuals/Notification";
import { useRouter } from "next/router";

interface IProps {
  product: IProduct;
  action: string;
  heading: string;
  setLoading: (loading: boolean) => void;
}

const AdminAddEditProduct: React.FC<IProps> = ({
  action,
  product,
  heading,
  setLoading,
}) => {
  const router = useRouter();

  const [productData, setProductData] = useState<IProduct>({
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    imageUrl: "",
  });
  const [form] = Form.useForm();

  useEffect(() => {
    product
      ? setProductData(product)
      : setProductData({
          id: 0,
          name: "",
          price: 0,
          quantity: 0,
          description: "",
          imageUrl: "",
        });
  }, [product]);

  const handleSubmit = (data: IProduct) => {
    setLoading(true);

    const imageUrl = localStorage.getItem(localStorageVars.PRODUCTIMAGEURL);
    if (imageUrl) {
      data.imageUrl = imageUrl;
    } else {
      data.imageUrl = "https://static.thenounproject.com/png/3237447-200.png";
    }

    localStorage.removeItem(localStorageVars.PRODUCTIMAGEURL);
    action == "add" ? handleAddNewProduct(data) : handleEditProduct(data);
  };

  const handleAddNewProduct = async (data: IProduct) => {
    setLoading(true);

    delete data.id;

    const res = await ProductRepository.addProduct(data);

    if (res.statusCode === 201) {
      openNotification({
        type: "success",
        message: "Product added successfully!",
      });
      setLoading(false);
    } else {
      openNotification({
        type: "error",
        message: "Something went wrong!",
      });

      setLoading(false);

    }

    router.back();

  };

  const handleEditProduct = async (data: IProduct) => {
    data.id = productData.id;

    setLoading(true);

    const res = await ProductRepository.editProduct(data);

    if (res.statusCode === 200) {
      openNotification({
        type: "success",
        message: "Product edited successfully!",
      });
      setLoading(false);
    } else {
      openNotification({
        type: "error",
        message: "Something went wrong!",
      });

      setLoading(false);
    }

    router.back();
  };

  return (
    <div className={`container ${classes.body}`}>
      <Form
        className={classes.content}
        form={form}
        name="add_edit_product"
        onFinish={handleSubmit}
        fields={[
          { name: ["name"], value: productData.name },
          { name: ["price"], value: productData.price },
          { name: ["quantity"], value: productData.quantity },
          {
            name: ["description"],
            value: productData.description,
          },
        ]}
      >
        <h1>{heading}</h1>
        {/* Title */}
        <Form.Item
          name="name"
          label="Title"
          rules={[{ required: true, message: "Please input a product title!" }]}
        >
          <Input />
        </Form.Item>
        <Row>
          <Col span={12}>
            {/* Price */}
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Quantity */}
            <Form.Item
              name="quantity"
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
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the quantity!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        {/* Image Upload */}
        <ProductImages preview={productData.imageUrl} />

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
