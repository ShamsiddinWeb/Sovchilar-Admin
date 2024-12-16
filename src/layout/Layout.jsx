import React, { useState } from "react";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
// import logo from "../assets/logo.png";
import { useStore } from "../store/store";
import { FcCollaboration, FcPlus, FcSurvey } from "react-icons/fc";

const { Header, Sider, Content } = Layout;

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { clearUser } = useStore();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const { id } = useParams();

  const getSelectedKeys = () => {
    switch (location?.pathname) {
      case "/":
        return ["1"];
      case `/lead/${id}`:
        return ["1"];
      case "/created":
        return ["2"];
      case `/created/${id}`:
        return ["2"];
      case "/married":
        return ["3"];
      default:
        return ["1"];
    }
  };

  const handleLogout = () => {
    navigate("/login");
    clearUser();
  };

  return (
    <Layout className="h-screen">
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <Link to="/" className="flex justify-center py-5 pb-10">
          {/* <img className="w-3/5" src={logo} alt="aqvo logo" /> */}
          <h3 className="text-[30px] text-red-600">
            {collapsed ? "SN" : "Sovchilar.net"}
          </h3>
        </Link>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          className="text-[18px]"
          items={[
            {
              key: "1",
              icon: <FcPlus style={{ fontSize: "20px" }} />,
              label: <Link to="/">Yangilar</Link>,
            },
            {
              key: "2",
              icon: <FcSurvey style={{ fontSize: "20px" }} />,
              label: <Link to="/created">Qo'shilganlar</Link>,
            },
            {
              key: "3",
              icon: <FcCollaboration style={{ fontSize: "20px" }} />,
              label: <Link to="/married">Oilali bo'lganlar</Link>,
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
    </Layout>
  );
};

export default RootLayout;
