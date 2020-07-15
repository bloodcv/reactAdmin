import React, { Component } from 'react';
import { Space } from 'antd';

export default class App extends Component {
  state = {
    count: 0,
  };

  constructor(props) {
    super(props);

    this.numRef = React.createRef();
  }

  /**
   * 增加
   */
  increment = () => {
    const num = this.numRef.current.value * 1;
    this.setState(state => ({
      count: state.count + num,
    }));
  };

  /**
   * 減少
   */
  decrement = () => {
    const num = this.numRef.current.value * -1;
    this.setState(state => ({
      count: state.count + num,
    }));
  };

  /**
   * 奇数则增加
   */
  incrementIfOdd = () => {
    const num = this.numRef.current.value * 1;
    const { count } = this.state;
    if (count % 2 === 1) {
      this.setState(state => ({
        count: state.count + num,
      }));
    }
  };

  /**
   * 异步增加
   */
  crementAsync = () => {
    const num = this.numRef.current.value * 1;
    setTimeout(() => {
      this.setState((state) => ({
        count: state.count + num
      }))
    }, 1000)
  };

  render() {
    const { count } = this.state;
    return (
      <div style={{ margin: '0 auto', maxWidth: '50vw', fontSize: 24 }}>
        <h1>count {count} times</h1>
        <Space>
          <select ref={this.numRef}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>&nbsp;-&nbsp;</button>
          <button onClick={this.incrementIfOdd}>incrementIfOdd</button>
          <button onClick={this.crementAsync}>crementAsync</button>
        </Space>
      </div>
    );
  }
}
