import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Form, Input, Select } from "antd";

const FormItem = Form.Item;
const { Option } = Select;
const { Password } = Input;

export default class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  componentWillMount() {
    this.props.setForm(this.formRef);
  }

  render() {
    const { roles } = this.props;

    const initialValues = {};

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    return (
      <Form name='userForm' ref={this.formRef} initialValues={initialValues} {...layout}>
        <FormItem
          label='用户名'
          name='username'
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
          ]}>
          <Input placeholder='请输入用户名'></Input>
        </FormItem>
        <FormItem
          label='密码'
          name='password'
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
          ]}>
          <Password placeholder='请输入密码'></Password>
        </FormItem>
        <FormItem
          label='电话'
          name='phone'
          rules={[
            {
              required: true,
              message: "请输入电话号码",
            },
          ]}>
          <Input type='tel' placeholder='请输入电话号码'></Input>
        </FormItem>
        <FormItem
          label='邮箱'
          name='email'
          rules={[
            {
              required: true,
              message: "请输入邮箱",
            },
          ]}>
          <Input type='email' placeholder='请输入邮箱'></Input>
        </FormItem>
        <FormItem
          label='角色'
          name='role_id'
          rules={[
            {
              required: true,
              message: "请选择角色"
            }
          ]}>
          <Select placeholder='请选择角色'>
            {roles.map(role => (
              <Option value={role._id} key={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </FormItem>
      </Form>
    );
  }
}
