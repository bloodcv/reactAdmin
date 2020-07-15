/*
 * @Description: 入口js
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-22 15:21:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-26 19:01:41
 */

import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

import App from "./App";

//如果local中保存了user, 将user保存到内存中
const user = storageUtils.getUser();
if (user && user._id) {
  memoryUtils.user = user;
}

// 将App组件标签渲染到index页面的div上
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App></App>
  </ConfigProvider>,
  document.getElementById("root")
);
