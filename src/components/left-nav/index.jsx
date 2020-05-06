import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
// import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import * as Icon from "@ant-design/icons";

import "./index.less";
import logo from "../../assets/imgs/logo.png";
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

export default class LeftNav extends Component {
  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用map + 递归调用
   */
  getMenuNodes_map = menuList => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <MenuItem key={item.key}>
            <Link to={item.key}>
              {React.createElement(Icon[item.icon])}
              <span>{item.title}</span>
            </Link>
          </MenuItem>
        );
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <>
                {React.createElement(Icon[item.icon])}
                {item.title}
              </>
            }>
            {this.getMenuNodes_map(item.children)}
          </SubMenu>
        );
      }
    });
  };

  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用reduce + 递归调用
   */
  getMenuNodes = menuList => {
    return menuList.reduce((pre, item) => {
      // 没有子节点
      if (!item.children) {
        pre.push(
          <MenuItem key={item.key}>
            <Link to={item.key}>
              {React.createElement(Icon[item.icon])}
              <span>{item.title}</span>
            </Link>
          </MenuItem>
        );
        // 有子节点
      } else {
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <>
                {React.createElement(Icon[item.icon])}
                {item.title}
              </>
            }>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };

  render() {
    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>管理后台</h1>
        </Link>
        <Menu
          defaultSelectedKeys={[menuList[0].key]}
          mode='inline'
          theme='dark'>
          {this.getMenuNodes(menuList)}
        </Menu>
      </div>
    );
  }
}

/*
<Menu
mode='inline'
theme='dark'>
<MenuItem key='1' icon={<PieChartOutlined />}>
  <Link to='/home'>首页</Link>
</MenuItem>
<SubMenu key='sub1' icon={<MailOutlined />} title='商品'>
  <MenuItem key='2' icon={<PieChartOutlined />}>
    <Link to='/category'>品类管理</Link>
  </MenuItem>
  <MenuItem key='3' icon={<PieChartOutlined />}>
    <Link to='/product'>商品管理</Link>
  </MenuItem>
</SubMenu>
<MenuItem key='4' icon={<PieChartOutlined />}>
  <Link to='/user'>用户管理</Link>
</MenuItem>
<MenuItem key='5' icon={<PieChartOutlined />}>
  <Link to='/role'>角色管理</Link>
</MenuItem>
<SubMenu key='sub2' icon={<MailOutlined />} title='图形图表'>
  <MenuItem key='6' icon={<PieChartOutlined />}>
    <Link to='/bar'>柱形图</Link>
  </MenuItem>
  <MenuItem key='7' icon={<PieChartOutlined />}>
    <Link to='/line'>折线图</Link>
  </MenuItem>
  <MenuItem key='8' icon={<PieChartOutlined />}>
    <Link to='/pie'>饼图</Link>
  </MenuItem>
</SubMenu>
</Menu>
 */
