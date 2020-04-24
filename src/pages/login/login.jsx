import React, { Component } from 'react'
import {
  Form,
  Input,
  Button
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'
import logo from './imgs/logo.png'

class Login extends Component {
  onFinish = values => {
    console.log('Received values of form: ', values);
  };

  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <NormalLoginForm />
        </section>
      </div>
    )
  }
}

const FormItem = Form.Item;
const NormalLoginForm = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}>
      <FormItem
        hasFeedback
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}>
        <Input
          allowClear
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="用户名" />
      </FormItem>
      <FormItem
        hasFeedback
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}>
        <Input
          allowClear
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码" />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </FormItem>
    </Form>
  );
};

/*
  1.高阶函数
    1) 一类特别的函数
      a.接受函数类型的参数
      b.返回值是函数
    2) 常见
      a.定时器: setTimeout()/setInterval()
      b.Promise: Promise(() => {}) then(value => {}, reason => {})
      c.数组遍历相关: forEach()/filter()/map()/reduce()/find()/findIndex()
      d.函数对象的bind()
    3) 高阶函数更加动态、更加具有拓展性
  2.高阶组件
    1) 本质是一个函数
    2) 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3) 作用：拓展组件的功能
    4) 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
*/

export default Login;
