/*
 * @Description: axios封装
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-27 21:32:58
 * @LastEditors: saya
 * @LastEditTime: 2020-04-28 20:53:20
 */

/*
 *能发送ajax请求的函数模块
 *包装axios
 *函数的返回值是promise对象
 *axios.get()/post()返回的就是promise对象
 *返回自己创建的promise对象：
 *  统一处理请求异常
 *  异步返回结果数据，而不是包含结果数据的response
 */

import axios from "axios";
import { message } from "antd";

export default function ajax(url, data = {}, method = "GET") {
  return new Promise((resolve, reject) => {
    let promise;
    // 执行异步ajax请求
    if (method === "GET") {
      // params配置指定的是query参数
      promise = axios.get(url, {
        params: data,
      });
    } else if (method === "POST") {
      promise = axios.post(url, data);
    }
    promise
      .then(res => {
        // 如果成功了，调用resolve(res.data)
        resolve(res.data);
      })
      .catch(err => {
        // 如果失败了，提示后台请求出错
        message.error("请求错误：", err.message);
      });
  });
}
