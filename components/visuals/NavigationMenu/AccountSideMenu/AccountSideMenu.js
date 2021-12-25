import { Button, Menu } from "antd";
import React, { useState } from "react";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
  LockOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import classes from "./AccountSideMenu.module.css";
import Link from "next/link";
import { links, localStorageVars } from "../../../../utilities/constants";
import { logout } from "../../../../store/actions/auth";
import { useDispatch } from "react-redux";

const AccountSideMenu = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState(
    localStorage.getItem(localStorageVars.CURRENTACCOUNTSIDEMENUKEY) || "1"
  );

  return (
    <div className={classes.accountSideMenu}>
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
          localStorage.setItem(
            localStorageVars.CURRENTACCOUNTSIDEMENUKEY,
            e.key
          );
        }}
        selectedKeys={currentKey}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        color="green"
        style={{ color: "green" }}
      >
        {/* Dashboard */}
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link href={links.MYACCOUNT}>Dashboard</Link>
        </Menu.Item>

        {/* Orders */}
        <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
          <Link href={links.ORDERS}>My Orders</Link>
        </Menu.Item>

        {/* Change Password */}
        <Menu.Item key="3" icon={<LockOutlined />}>
          <Link href={links.CHANGEPASSWORD}>Change Password</Link>
        </Menu.Item>

        {/* Logout */}
        <Menu.Item
          key="4"
          icon={<LogoutOutlined />}
          onClick={() => dispatch(logout())}
        >
          <a>Logout</a>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AccountSideMenu;
