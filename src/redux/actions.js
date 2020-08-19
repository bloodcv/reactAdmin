/**
 * 包含n个action creator的函数模块
 * 返回值：
 *   同步action：对象 {type：'xxx', data: 数据值}
 *   异步action：函数 dispatch => {}
 */
import { SET_HEAD_TITLE, RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from './action-types';
import { reqLogin } from '../api';
import storageUtils from '../utils/storageUtils';

/**
 * 设置头部标题的同步action
 */
export const setHeadTile = headTitle => ({
  type: SET_HEAD_TITLE,
  data: headTitle,
});

/**
 * 接收用户的同步action
 */
export const receiveUser = user => ({ type: RECEIVE_USER, user });

/**
 * 退出登录的同步action
 */
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser();
  // 返回action对象
  return { type: RESET_USER }
}

/**
 * 显示错误信息的同步action
 */
export const showErrorMsg = errorMsg => ({ type: SHOW_ERROR_MSG, errorMsg });

/**
 * 登陆的异步action
 */
export const login = loginValue => {
  return async dispatch => {
    // 执行异步ajax请求
    const result = await reqLogin(loginValue);
    // 1.如果成功，发放成功同步action
    if (result.status === 0) {
      const user = result.data;
      // 更新localstorage
      storageUtils.saveUser(user);
      // 分发接收用户的同步action，更新store
      dispatch(receiveUser(user));
    } else {
      // 2.如果失败，发放失败同步action
      const errorMsg = result.msg;
      dispatch(showErrorMsg(errorMsg));
    }
  };
};
