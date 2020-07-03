import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Form, Input, Select } from "antd";
import compareDeeply from "../../utils/tool";

const FormItem = Form.Item;
const { Option } = Select;
const { Password } = Input;

export default class UserForm extends PureComponent {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  componentWillMount() {
    this.props.setForm(this.formRef);
  }

  componentWillReceiveProps(nextProps) {
    const userObj = {
      username: null,
      password: null,
      phone: null,
      email: null,
      role_id: undefined,
    }
    const { user } = this.props;
    const compareResult = compareDeeply(nextProps.user, user);
    if(!compareResult) {
      this.formRef.current.setFieldsValue({ ...userObj, ...nextProps.user });
    }
  }

  render() {
    console.log("form render()");
    const { roles, user } = this.props;

    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    return (
      <Form
        name='userForm'
        ref={this.formRef}
        initialValues={{
          username: user.username,
          password: user.password,
          phone: user.phone,
          email: user.email,
          role_id: user.role_id,
        }}
        {...layout}>
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
        {user._id ? null : (
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
        )}
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
              message: "请选择角色",
            },
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
