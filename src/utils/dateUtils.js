/*
 * @Author: saya
 * @Date: 2020-05-19 17:32:45
 * @LastEditTime: 2020-07-01 14:06:58
 * @LastEditors: Please set LastEditors
 * @Description: 时间工具模块
 * @FilePath: \sggpro\react-admin_client\src\utils\dateUtils.js
 */

export const formatDate = time => {
  if (!time) return "";
  let date = new Date(time);
  let year = date.getFullYear();
  let originMonth = date.getMonth() + 1;
  let month = originMonth < 10 ? `0${originMonth}` : originMonth;
  let originDay = date.getDate();
  let day = originDay < 10 ? `0${originDay}` : originDay;
  let originHours = date.getHours();
  let hours = originHours < 10 ? `0${originHours}` : originHours;
  let originMinutes = date.getMinutes();
  let minutes = originMinutes < 10 ? `0${originMinutes}` : originMinutes;
  let originSeconds = date.getSeconds();
  let seconds = originSeconds < 10 ? `0${originSeconds}` : originSeconds;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
