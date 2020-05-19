/*
 * @Description: api管理
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-28 19:54:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-05-19 17:20:41
 */

/**
 * 包含n个接口请求函数的模块
 * 每个函数返回promise
 */

import ajax from "./ajax";
import jsonp from "jsonp";

import { message } from "antd";

// 登录
export const reqLogin = params => ajax("/login", params, "POST");

/**
 * jsonp请求的接口请求函数
 */
export const reqWeather = city => {
  const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=d325c2029eb25fb18127449297f12cfb`;
  return new Promise((resolve, reject) => {
    jsonp(url, {}, (err, data) => {
      if (!err && data.info === "OK") {
        const { city, weather } = data.lives[0];
        resolve({ city, weather });
      } else {
        message.error('天气请求有误：' + err);
      }
    });
  });
};
