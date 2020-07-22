/**
 * 包含n个用来创建action的工厂函数(action creator)
 */
import { INCREMENT, DECREMENT } from './action-types'

/**
 * 增加count
 */
export const increment = (num) => ({type: INCREMENT, data: num});
/**
 * 减少count
 */
export const decrement = (num) => ({type: DECREMENT, data: num});
