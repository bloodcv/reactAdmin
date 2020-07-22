/**
 * reducer函数模块：根据当前state和指定的action返回一个新的state
 */
import { INCREMENT, DECREMENT } from './action-types'

/**
 * 管理count状态数据的reducer
 */
export default function count(state = 0, action) {
  console.log('count()', state, action)
  switch(action.type) {
    case INCREMENT:
      return state + action.data;
    case DECREMENT:
      return state - action.data;
    default:
      return state;
  }
}