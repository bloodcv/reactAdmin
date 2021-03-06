/*
 * @Description: 维持登陆
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-29 15:47:20
 * @LastEditors: saya
 * @LastEditTime: 2020-05-08 11:25:38
 */

/**
 * 1. 登陆后 , 刷新后依然是已登陆状态 ( 维持登陆 )
 * 2. 登陆后 , 关闭浏览器后打开浏览器访问依然是已登陆状态 ( 自动登陆 )
 * 3. 登陆后 , 访问登陆路径自动跳转到管理界面
 * 包含 n 个操作 local storage 的工具函数的模块
 */

import store from "store";

const USER_KEY = "user_key";

export default {
  saveUser(user) {
    // localStorage 只能保存string，如果传递是对象，会自动调用对象的toString()并保存
    // localStorage.setItem(USER_KEY, JSON.stringify(user)); // 保存的必须是对象的 json 串
    store.set(USER_KEY, user); // 内部会自动转换成 json 再保存
  },
  getUser() {
    // 如果存在 , 需要返回的是对象 , 如果没有值 , 返回 {}
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    return store.get(USER_KEY) || {};
  },
  removeUser() {
    // localStorage.removeItem(USER_KEY);
    store.remove(USER_KEY);
  },
};
