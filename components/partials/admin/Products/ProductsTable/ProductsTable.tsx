import { useRouter } from "next/router";
import React from "react";
import { Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  editProduct,
} from "../../../../../store/actions/product";
import { useDispatch } from "react-redux";
import { links, localStorageVars } from "../../../../../utilities/constants";
import AdminNoProducts from "../../../../shared/EmptyContent/AdminNoProducts/AdminNoProducts";

interface IProps{
  products:[],
}

const ProductsTable:React.FC<IProps> = ({ products }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const goToEditPage = (product) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        localStorageVars.PRODUCTDATA,
        JSON.stringify(product)
      );
      localStorage.setItem(localStorageVars.ADDEDITPRODUCT, "edit");
      router.push(links.ADDEDITPRODUCT);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "productTitle",
      key: "productTitle",
    },

    {
      title: "Price",
      dataIndex: "productPrice",
      key: "productPrice",
      render: (price) => <span>₦{price}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "productQuantity",
      key: "productQuantity",
    },
    {
      title: "Edit",
      key: "edit",
      render: (text, record) => {
        return <EditOutlined onClick={() => goToEditPage(record)} />;
      },
    },

    {
      title: "Delete",
      key: "delete",
      render: (text, record) => {
        return (
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() =>
              dispatch(editProduct(products, record, "deleteProduct"))
            }
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="red" />
          </Popconfirm>
        );
      },
    },
  ];

  return (
    <div>
      {products && products.length < 1 ? (
        <AdminNoProducts />
      ) : (
        <Table
          dataSource={products}
          columns={columns}
          rowKey={(record) => record.productId}
        />
      )}
    </div>
  );
};

export default ProductsTable;
