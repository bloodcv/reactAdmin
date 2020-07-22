/**
 * 容器组件：通过connect包装UI组件产生组件
 * connect(): 高阶函数
 * connect()返回的是一个高阶组件：接收一个UI组件，返回一个容器组件
 * 容器组件的责任：向UI组件传入特定的属性
 */
import { connect } from 'react-redux';

import { increment, decrement, incrementAsync } from '../redux/actions';
import Counter from '../components/counter';

/**
 * mapStateToProps用来将redux管理的state数据映射成UI组件的一般属性的函数
 * mapDispatchToProps用来将包含dispath代码的函数映射成UI组件的函数属性的函数
 */
export default connect(
  state => ({count: state}),
  // 复杂写法：如果是函数，会自动调用得到对象，将对象中的方法作为函数属性传入UI组件中
  // 简写写法：如果是对象，将对象中的的方法包装成一个新的函数，传入UI组件
  {increment, decrement, incrementAsync}
)(Counter);
