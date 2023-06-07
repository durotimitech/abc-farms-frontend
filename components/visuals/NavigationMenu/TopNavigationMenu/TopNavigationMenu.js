import React from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./TopNavigationMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/actions/auth";
import { Badge, Menu, Dropdown } from "antd";
import {
  DownOutlined,
  CarryOutOutlined,
  HeartOutlined,
  LogoutOutlined,
  UserSwitchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { accessLevels, links } from "../../../../utilities/constants";

const NavigationMenu = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userAccessLevel = useSelector((state) => state.auth.accessLevel);
  const firstName = useSelector((state) => state.auth.firstName);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const menu = (
    <Menu>
      {/* My Account */}
      <Menu.Item key="1">
        <UserOutlined className={`${classes.dropdown_item}`} />
        <Link passHref href={links.MYACCOUNT}>
          My Account
        </Link>
      </Menu.Item>

      {/* Orders */}
      <Menu.Item key="2">
        <CarryOutOutlined className={`${classes.dropdown_item}`} />
        <Link passHref href={links.ORDERS}>
          Orders
        </Link>
      </Menu.Item>
      {/* Wishlist */}
      <Menu.Item key="3">
        <HeartOutlined className={`${classes.dropdown_item}`} />
        <Link passHref href={links.WISHLIST}>
          Wishlist
        </Link>
      </Menu.Item>

      {/* Logout */}
      <Menu.Item key="5">
        <a onClick={() => dispatch(logout())}>
          <LogoutOutlined className={`${classes.dropdown_item}`} />
          Logout
        </a>
      </Menu.Item>

      {/* Admin */}
      <Menu.Item hidden={userAccessLevel < accessLevels.ADMIN} key="6">
        <UserSwitchOutlined className={`${classes.dropdown_item}`} />
        <Link passHref href={links.ADMIN}>
          Admin
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <ul className={`container ${classes.nav_menu}`}>
        <li>
          {/* Logo */}
          <Link passHref href="/">
            <a data-testid="logo">
              <Image
                src="/images/logo.png"
                width="100"
                height="50"
                alt="Logo"
              />
            </a>
          </Link>
        </li>
        
        <div className={classes.links}>
          {/* Login */}
          <li hidden={isLoggedIn}>
            <Link href="/auth/login">Login</Link>
          </li>

          {/* Account Menu */}
          <li hidden={!isLoggedIn}>
            <Dropdown arrow={true} overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <UserOutlined className="fa_2x" /> <b>Hi, {firstName}</b>
                <DownOutlined />
              </a>
            </Dropdown>
          </li>

          {/* Cart */}
          <li hidden={!isLoggedIn}>
            <Badge
              data-testid="cartCounter"
              count={totalQuantity}
              color="green"
              size="small"
            >
              <Link passHref href={links.CART}>
                <a>
                  <ShoppingCartOutlined className="fa_2x" />
                </a>
              </Link>
            </Badge>
          </li>
        </div>
      </ul>
    </>
  );
};

export default NavigationMenu;
