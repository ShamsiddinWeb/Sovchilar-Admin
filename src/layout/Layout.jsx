import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { HiOutlineUsers } from "react-icons/hi2";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { BsShopWindow } from "react-icons/bs";
import { AiOutlineProduct } from "react-icons/ai";
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png"
const { Header, Sider, Content } = Layout;
const RootLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation(); // Location hook

  // Menu item selection based on current URL path
  const getSelectedKeys = () => {
    switch (location?.pathname) {
      case '/analytics':
        return ['1'];
      case '/products':
        return ['2'];
      case '/shops':
        return ['3'];
      case '/employees':
        return ['4'];
      default:
        return ['1'];
    }
  };
  return (
    <Layout className='h-screen'>
      <Sider theme='light' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Link to='/analytics' className='flex justify-center py-5'><img className='w-3/5' src={logo} alt="aqvo logo" /></Link>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          className='text-[16px]'
          
          items={[
            {
                key: '1',
                icon: <TbDeviceDesktopAnalytics style={{fontSize: "20px"}}/>,
                label: <Link to="/">Analytics</Link>,  
              },
              {
                key: '2',
                icon: <AiOutlineProduct style={{fontSize: "20px"}}/>,
                label: <Link to="/products">Products</Link>, 
              },
              {
                key: '3',
                icon: <BsShopWindow style={{fontSize: "20px"}}/>,
                label: <Link to="/shops">Shops</Link>, 
              },
              {
                key: '4',
                icon: <HiOutlineUsers style={{fontSize: "20px"}}/>,
                label: <Link to="/employees">Employees</Link>,  
              },
        
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default RootLayout;