/*
 * @Description: api管理
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-28 19:54:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-06-23 16:07:38
 */

/**
 * 包含n个接口请求函数的模块
 * 每个函数返回promise
 */

import ajax from "./ajax";
import jsonp from "jsonp";

import { message } from "antd";

/**
 * 登录
 */
export const reqLogin = params => ajax("/login", params, "POST");
/**
 * 获取一级或某个二级分类列表
 */
export const reqGetCategorys = parentId => ajax("/manage/category/list", { parentId });
/**
 * 添加分类
 */
export const reqAddCategorys = (parentId, categoryName) =>
  ajax("/manage/category/add", { parentId, categoryName }, "POST");
/**
 * 更新品类名称
 */
export const reqUpdateCategorys = ({ categoryId, categoryName }) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");
/**
 * 获取商品分页列表
 */
export const reqGetProducts = ({ pageNum, pageSize }) => ajax("/manage/product/list", { pageNum, pageSize });
/**
 * 根据搜索内容搜索商品分页列表
 * searchType: productName/productDesc 作为搜索的key
 */
export const reqSrchProducts = ({ pageNum, pageSize, searchType, searchName }) =>
  ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });
/**
 * 根据商品id获取商品信息
 */
export const reqGetCategoryInfo = categoryId => ajax("/manage/category/info", { categoryId });
/**
 * 对商品进行上架/下架处理
 */
export const reqUpdateCategoryStatus = ({ productId, status }) =>
  ajax("/manage/product/updateStatus", { productId, status }, "POST");
/**
 * 删除图片
 */
export const reqRemovePic = name => ajax("/manage/img/delete", { name }, "POST");
/**
 * 新增、更新商品
 */
export const reqAddOrUpdateProduct = product => ajax(`/manage/product/${product._id ? 'update' : 'add'}`, product, "POST");

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
        message.error("天气请求有误：" + err);
      }
    });
  });
};
