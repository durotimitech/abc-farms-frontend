import { useRouter } from "next/router";
import React from "react";
import { Table, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, RollbackOutlined } from "@ant-design/icons";
import { links, localStorageVars } from "../../../../../utilities/constants";
import AdminNoProducts from "../../../../shared/EmptyContent/AdminNoProducts/AdminNoProducts";
import { IProduct } from "../../../../../store/interfaces/product";
import ProductRepository from "../../../../../repositories/ProductRepository";
import openNotification from "../../../../visuals/Notification";

interface IProps {
  products: IProduct[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  setPageNumber: (pageNumber: number) => void;
}

const ProductsTable: React.FC<IProps> = ({
  products,
  totalCount,
  pageNumber,
  pageSize,
  setPageSize,
  setPageNumber,
}) => {
  const router = useRouter();

  const goToEditPage = (product: IProduct) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        localStorageVars.PRODUCTDATA,
        JSON.stringify(product)
      );
      localStorage.setItem(localStorageVars.ADDEDITPRODUCT, "edit");
      router.push(links.ADDEDITPRODUCT);
    }
  };

  const toggleDeleteProduct = async (product: IProduct) => {
    const res = await ProductRepository.deleteProduct(product.id);

    if (res.statusCode === 200) {
      openNotification({
        type: "success",
        message: "Product edited successfully!",
      });

      router.reload();
    } else {
      openNotification({
        type: "error",
        message: "Something went wrong!",
      });

    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>₦{price}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
      render: (text:string, record:IProduct) => 
      record.deleted ? (
        <Popconfirm
          title="Are you sure to restore this product?"
          onConfirm={() => toggleDeleteProduct(record)}
          okText="Yes"
          cancelText="No"
        >
          <RollbackOutlined className="green" />
        </Popconfirm>
      ) : (
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => toggleDeleteProduct(record)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined className="red" />
        </Popconfirm>
      ),
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
          rowKey={(record: IProduct) => record.id}
          pagination={{
            total: totalCount,
            current: pageNumber,
            pageSize: pageSize,
            onChange: (page, pageSize) => {
              setPageNumber(page);
              setPageSize(pageSize);
            },
          }}
        />
      )}
    </div>
  );
};

export default ProductsTable;
