/**
 * 容器组件：通过connect包装UI组件产生组件
 * connect(): 高阶函数
 * connect()返回的是一个高阶组件：接收一个UI组件，返回一个容器组件
 * 容器组件的责任：向UI组件传入特定的属性
 */
import { connect } from 'react-redux';

import { increment, decrement } from '../redux/actions';
import Counter from '../components/counter';

function mapStateToProps(state) {
  return {
    count: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: num => dispatch(increment(num)),
    decrement: num => dispatch(decrement(num)),
  };
}

/**
 * mapStateToProps用来将redux管理的state数据映射成UI组件的一般属性的函数
 * mapDispatchToProps用来将包含dispath代码的函数映射成UI组件的函数属性的函数
 */
export default connect(
  mapStateToProps, // 指定一般属性
  mapDispatchToProps // 指定函数属性
)(Counter);
