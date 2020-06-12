import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "antd";
// import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import * as Icon from "@ant-design/icons";

import "./index.less";
import logo from "../../assets/imgs/logo.png";
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;
const MenuItem = Menu.Item;

class LeftNav extends Component {
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
    const path = this.props.location.pathname;

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
        //查找一个与当前路径匹配的子item
        //如果存在 说明当前二级菜单需要展开
        if (item.children.find(cItem => path.indexOf(cItem.key) === 0)) {
          // console.log('二级菜单需要展开?', item.key)
          this.openKey = item.key;
        }

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

  /**
   * 在第一次render()之前执行一次
   * 为第一个render()准备数据(必须是同步的)
   */
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    // 得到当前访问的路由路径
    let path = this.props.location.pathname;

    if(path.indexOf('/product/') === 0) {
      path = '/product'
    }

    //得到需要打开菜单的key
    const openKey = this.openKey;
    // console.log(openKey)

    return (
      <div className='left-nav'>
        <Link to='/' className='left-nav-header'>
          <img src={logo} alt='logo' />
          <h1>管理后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode='inline'
          theme='dark'>
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

/**
 * widthRouter高阶组件
 * 包装非路由组件，返回一个新的组件
 * 新的组件向费路由组件传递3个属性： history、location、match
 */

export default withRouter(LeftNav);
