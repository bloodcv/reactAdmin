/**
 * 包含n个用来创建action的工厂函数(action creator)
 */
import { INCREMENT, DECREMENT } from './action-types'

/**
 * 增加count 同步action：返回对象
 */
export const increment = (num) => ({type: INCREMENT, data: num});
/**
 * 减少count 同步actin：返回对象
 */
export const decrement = (num) => ({type: DECREMENT, data: num});
/**
 * 增加count 异步action：返回函数
 */
export const incrementAsync = (num) => {
  return (dispatch) => {
    // 1.执行异步(定时器、ajax请求、promise)
    setTimeout(() => {
      // 2.当前异步任务执行完成时，分发一个同步action
      dispatch(increment(num))
    }, 1000)
  }
}
