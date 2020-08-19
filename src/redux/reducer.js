/**
 * 用来根据老的state和指定的action生成并返回新的state的函数
 */
import { combineReducers } from 'redux';

import {
  SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER
} from './action-types'
import storageUtils from '../utils/storageUtils';

/**
 * 用来管理头部标题的reducer函数
 */
const headTitleInit = ''
const headTitle = (state = headTitleInit, action) => {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data
    default:
      return state;
  }
}

/**
 * 用来管理当前登录用户的reducer函数
 */
const userInit = storageUtils.getUser();
const user = (state = userInit, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user;
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg;
      // state.errorMsg = errorMsg  // 不要直接修改原本状态数据,这是错的
      return {...state, errorMsg}
    case RESET_USER:
      return {}
    default:
      return state;
  }
}

/**
 * 向外默认暴露的是合并生成的总的reducer函数
 * 总的reducer函数返回的数据结构：
 * {
 *  headTitle: '首页',
 *  user: {}
 * }
 */
export default combineReducers({
  headTitle,
  user
})