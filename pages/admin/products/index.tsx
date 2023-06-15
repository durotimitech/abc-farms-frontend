import React, { useEffect, useState } from "react";
import Products from "../../../components/partials/admin/Products/Products";
import { useSelector } from "react-redux";
import Spinner from "../../../components/visuals/Spin/Spin";
import withAuth from "../../../components/hocs/RouteAuth";
import AdminLayout from "../../../components/visuals/Layout/AdminLayout/AdminLayout";
import { IRole } from "../../../store/interfaces/auth";
import { IProduct } from "../../../store/interfaces/product";
import { Skeleton } from "antd";
import ProductRepository from "../../../repositories/ProductRepository";

const AdminProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const res = await ProductRepository.getProducts(pageNumber, pageSize);

      if (res.statusCode === 200) {
        setProducts(res.data.products);
        setTotalCount(res.data.totalCount);
      }
      setLoading(false);
    })();
  }, [pageSize, pageNumber]);

  return (
    <>
      <AdminLayout pageTitle={"Products"}>
        <>
          {loading ? (
            <Skeleton active />
          ) : (
            <Products
              products={products}
              totalCount={totalCount}
              pageNumber={pageNumber}
              pageSize={pageSize}
              setPageNumber={setPageNumber}
              setPageSize={setPageSize}
            />
          )}
        </>
      </AdminLayout>
    </>
  );
};

export default withAuth(AdminProductsPage, [IRole.ADMIN]);
