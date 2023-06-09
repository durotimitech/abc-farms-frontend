import { Button, Menu } from "antd";
import React, { useState } from "react";
import {
  ShopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import classes from "./AdminSideMenu.module.css";
import Link from "next/link";
import { links, localStorageVars } from "../../../../utilities/constants";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/auth";

const AdminSideMenu = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: RootStateOrAny) => state.auth.role);
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState(
    localStorage.getItem(localStorageVars.CURRENTADMINSIDEMENUKEY) || "1"
  );

  return (
    <div className={classes.adminSideMenu}>
      <Button
        className="btn"
        onClick={() => setCollapsed(!collapsed)}
        style={{ marginBottom: 16 }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        onClick={(e) => {
          setCurrentKey(e.key);
          localStorage.setItem(localStorageVars.CURRENTADMINSIDEMENUKEY, e.key);
        }}
        selectedKeys={currentKey}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
      >
        {/* Dashboard */}
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link href={links.ADMIN}>Dashboard</Link>
        </Menu.Item>

        {/* Products */}
        <Menu.Item key="2" icon={<ShopOutlined />}>
          <Link href={links.ADMINPRODUCTS}>Products</Link>
        </Menu.Item>

        {/* Orders */}
        <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
          <Link href={links.ADMINORDERS}>Orders</Link>
        </Menu.Item>

        {/* Access Control */}
          <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
            <Link href={links.ACCESSCONTROL}>Manage Access</Link>
          </Menu.Item>
        {/* Logout */}
        <Menu.Item key="5" icon={<LogoutOutlined />}>
          <p onClick={() => dispatch(logout())}>Logout</p>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AdminSideMenu;
