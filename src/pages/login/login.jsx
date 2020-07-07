import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";

import "./login.less";
import logo from "../../assets/imgs/logo.png";

import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { reqLogin } from "../../api";

class Login extends Component {
  render() {
    const FormItem = Form.Item;
    const onFinish = async values => {
      let res = await reqLogin(values);
      // console.log("获取form表单内容", res);
      if (res.status === 1) {
        message.error(res.msg);
        return;
      }
      const user = res.data;
      // 登录成功
      // 保存用户数据
      // 提示登录成功，保存用户登录信息，跳转到主页
      message.success("登陆成功");
      memoryUtils.user = user;
      storageUtils.saveUser(user);
      // 跳转到后台管理路由 ( 已经登录成功，不需要回退了 )
      this.props.history.replace("/");
    };

    // 如果用户已经登陆 , 自动跳转到 admin
    if (memoryUtils.user && memoryUtils.user._id) {
      return <Redirect to='/'></Redirect>;
    }

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt='logo' />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form
            name='normal_login'
            className='login-form'
            onFinish={onFinish}
            initialValues={{ username: "admin" }}>
            <FormItem
              hasFeedback
              name='username'
              rules={[
                // 配置对象：属性名是特定的一些名称
                // 声明式验证：直接使用别人定义好的验证规则进行验证
                { required: true, whitespace: true, message: "请输入" },
                { min: 4, message: "至少4位" },
                { max: 12, message: "最多12位" },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "必须是英文数字或者下滑线组成",
                },
              ]}>
              <Input
                allowClear
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='用户名'
              />
            </FormItem>
            <FormItem
              hasFeedback
              name='password'
              rules={[
                // 自定义验证
                {
                  validator: (rule, value) => {
                    if (!value) {
                      return Promise.reject("必填");
                    } else if (value.length < 4) {
                      return Promise.reject("至少4位");
                    } else if (value.length > 12) {
                      return Promise.reject("至多12位");
                    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                      return Promise.reject("必须是英文数字或者下滑线组成");
                    } else {
                      return Promise.resolve();
                    }
                  },
                },
              ]}>
              <Input
                allowClear
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='密码'
              />
            </FormItem>
            <FormItem>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'>
                登录
              </Button>
            </FormItem>
          </Form>
        </section>
      </div>
    );
  }
}
/*
const FormItem = Form.Item;
const NormalLoginForm = () => {
  const onFinish = async values => {
    let res = await reqLogin(values);
    // console.log("获取form表单内容", res);
    if (res.status === 1) {
      message.error(res.msg);
      return;
    }
    message.success("登陆成功");
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      onFinish={onFinish}
      initialValues={{ username: "admin" }}>
      <FormItem
        hasFeedback
        name='username'
        rules={[
          // 配置对象：属性名是特定的一些名称
          // 声明式验证：直接使用别人定义好的验证规则进行验证
          { required: true, whitespace: true, message: "请输入" },
          { min: 4, message: "至少4位" },
          { max: 12, message: "最多12位" },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: "必须是英文数字或者下滑线组成",
          },
        ]}>
        <Input
          allowClear
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='用户名'
        />
      </FormItem>
      <FormItem
        hasFeedback
        name='password'
        rules={[
          // 自定义验证
          {
            validator: (rule, value) => {
              if (!value) {
                return Promise.reject("必填");
              } else if (value.length < 4) {
                return Promise.reject("至少4位");
              } else if (value.length > 12) {
                return Promise.reject("至多12位");
              } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                return Promise.reject("必须是英文数字或者下滑线组成");
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}>
        <Input
          allowClear
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='密码'
        />
      </FormItem>
      <FormItem>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          登录
        </Button>
      </FormItem>
    </Form>
  );
};
 */
/**
 * 1.高阶函数
 *   1) 一类特别的函数
 *     a.接受函数类型的参数
 *     b.返回值是函数
 *   2) 常见
 *     a.定时器: setTimeout()/setInterval()
 *     b.Promise: Promise(() => {}) then(value => {}, reason => {})
 *     c.数组遍历相关: forEach()/filter()/map()/reduce()/find()/findIndex()
 *     d.函数对象的bind()
 *   3) 高阶函数更加动态、更加具有拓展性
 * 2.高阶组件
 *   1) 本质是一个函数
 *   2) 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
 *   3) 作用：拓展组件的功能
 *   4) 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */

export default Login;
