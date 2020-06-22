/*
 *后台管理的路由组件
 */

import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import memoryUtils from "../../utils/memoryUtils";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav";

import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import User from "../user/user";
import Role from "../role/role";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to='/login'></Redirect>;
    }

    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header></Header>
          <Content style={{ margin: 20, backgroundColor: "#fff" }}>
            <Switch>
              <Route path='/home' component={Home}></Route>
              <Route path='/category' component={Category}></Route>
              <Route path='/product' component={Product}></Route>
              <Route path='/user' component={User}></Route>
              <Route path='/role' component={Role}></Route>
              <Route path='/bar' component={Bar}></Route>
              <Route path='/line' component={Line}></Route>
              <Route path='/pie' component={Pie}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#aaa" }}>Footer</Footer>
        </Layout>
      </Layout>
    );
  }
}
