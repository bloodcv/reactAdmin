/*
 * @Description: api管理
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-28 19:54:51
 * @LastEditors: saya
 * @LastEditTime: 2020-04-28 20:54:18
 */

/**
 * 包含n个接口请求函数的模块
 * 每个函数返回promise
 */

import ajax from './ajax'

// 登录
export const reqLogin = (params) => ajax('/login', params, 'POST');