import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
// import { PieChartOutlined, MailOutlined } from "@ant-design/icons";
import * as Icon from '@ant-design/icons';
import { connect } from 'react-redux';

import './index.less';
import logo from '../../assets/imgs/logo.png';
import menuList from '../../config/menuConfig';
// import memoryUtils from '../../utils/memoryUtils';
import { setHeadTile } from '../../redux/actions'

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

  hasAuth = item => {
    const { key, isPublic } = item;
    const menuSet = this.menuSet;
    /**
     * 几种直接通过的情况
     * 1.如果当前用户是admin  memoryUtils.user.username === 'admin'
     * 2.如果当前路由是开放的  isPublic
     * 3.如果菜单的key在该用户权限组的menus中  menuSet.has(key)
     * 4.如果有子节点，需要判断子节点中有没有节点在该用户权限组的menus中
     */
    // if (memoryUtils.user.username === 'admin' || isPublic || menuSet.has(key)) {
    if (this.props.user.username === 'admin' || isPublic || menuSet.has(key)) {
      return true;
    } else if (item.children) {
      return !!item.children.find(child => menuSet.has(child.key));
    }
  };

  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用reduce + 递归调用
   */
  getMenuNodes = menuList => {
    const path = this.props.location.pathname;

    return menuList.reduce((pre, item) => {
      // 如果当前用户有item对应的权限, 才需要显示对应的菜单项
      if (this.hasAuth(item)) {
        // 没有子节点
        if (!item.children) {
          if(path.indexOf(item.key) > -1) {
            this.props.setHeadTile(item.title)
          }

          pre.push(
            <MenuItem key={item.key}>
              <Link to={item.key} onClick={() => {this.props.setHeadTile(item.title)}}>
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
      }
      return pre;
    }, []);
  };

  /**
   * 在第一次render()之前执行一次
   * 为第一个render()准备数据(必须是同步的)
   */
  componentWillMount() {
    // this.menuSet = new Set(memoryUtils.user.role.menus || []);
    this.menuSet = new Set(this.props.user.role.menus || []);
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    // 得到当前访问的路由路径
    let path = this.props.location.pathname;

    if (path.indexOf('/product/') === 0) {
      path = '/product';
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
 * 新的组件向非路由组件传递3个属性： history、location、match
 */

export default connect(
  state => ({user: state.user}),
  { setHeadTile }
)(withRouter(LeftNav));
