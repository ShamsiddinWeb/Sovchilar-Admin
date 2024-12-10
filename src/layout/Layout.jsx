import React, { useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BsShopWindow } from "react-icons/bs";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { Button, Layout, Menu, Avatar, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/logo.png";
import { useStore } from "../store/store";
import EditLoginPasswordModal from "./eddModal";

const { Header, Sider, Content } = Layout;

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { clearUser, user } = useStore();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const { id } = useParams();

  const getSelectedKeys = () => {
    switch (location?.pathname) {
      case "/analytics":
        return ["1"];
      case "/categories":
        return ["2"];
      case `/categories/${id}`:
        return ["2"];
      case `/categories/history/${id}`:
        return ["2"];
      case "/shops":
        return ["3"];
      case `/shops/${id}`:
        return ["3"];
      case "/employees":
        return ["4"];
      case "/employees/attendance":
        return ["4"];
      case "/ready-product":
        return ["5"];
      case `/ready-product/${id}`:
        return ["5"];
      case `/ready-product/history/${id}`:
        return ["5"];
      default:
        return ["1"];
    }
  };

  const handleLogout = () => {
    navigate("/login");
    clearUser();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout className="h-screen">
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <Link to="/" className="flex justify-center py-5 pb-10">
          <img className="w-3/5" src={logo} alt="aqvo logo" />
        </Link>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          className="text-[16px]"
          items={[
            {
              key: "1",
              icon: <TbDeviceDesktopAnalytics style={{ fontSize: "20px" }} />,
              label: <Link to="/">Statistika</Link>,
            },
            {
              key: "2",
              icon: <FaBoxOpen style={{ fontSize: "20px" }} />,
              label: <Link to="/categories">Ombor</Link>,
            },
            {
              key: "3",
              icon: <BsShopWindow style={{ fontSize: "20px" }} />,
              label: <Link to="/shops">Magazinlar</Link>,
            },
            {
              key: "4",
              icon: <HiOutlineUsers style={{ fontSize: "20px" }} />,
              label: <Link to="/employees">Hodimlar</Link>,
            },
            {
              key: "5",
              icon: <AiOutlineProduct style={{ fontSize: "20px" }} />,
              label: <Link to="/ready-product">Tayyor mahsulotlar</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "20px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Avatar
                style={{ backgroundColor: "primary", cursor: "pointer" }}
                icon={<UserOutlined />}
                onClick={showModal}
              />
              <span>Profil</span>
            </div>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              Chiqish
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            maxHeight: "calc(100vh - 64px)",
            overflow: "auto",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      <EditLoginPasswordModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        userId={user?.id}
      />
    </Layout>
  );
};

export default RootLayout;
