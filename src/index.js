/*
 * @Description: 入口js
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-22 15:21:58
 * @LastEditors: saya
 * @LastEditTime: 2020-04-29 16:08:07
 */

import React from "react";
import ReactDOM from "react-dom";

import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

import App from "./App";

//如果local中保存了user, 将user保存到内存中
const user = storageUtils.getUser();
if (user && user._id) {
  memoryUtils.user = user;
}

// 将App组件标签渲染到index页面的div上
ReactDOM.render(<App></App>, document.getElementById("root"));
