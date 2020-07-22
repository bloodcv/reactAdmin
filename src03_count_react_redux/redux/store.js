/**
 * redux最核心的管理对象：store
 */
import { createStore } from 'redux'

import reducer from './reducer'

/**
 * 创建store对象的时候，内部会自动第一次调用reducer()得到初始状态值
 */
export default createStore(reducer)