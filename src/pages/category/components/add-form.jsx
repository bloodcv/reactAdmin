import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const { Option } = Select;

export default class AddForm extends Component {
  // static propTypes = {
  //   categoryName: PropTypes.string.isRequired
  // }

  render() {
    // const { categoryName } = this.props

    return (
      <Form
        name='addform'
        initialValues={{
          parentId: "0",
          categoryName: "",
        }}
        layout='vertical'>
        <FormItem
          label='所属类别'
          name='parentId'
          rules={[
            {
              required: true,
              message: "必选",
            },
          ]}>
          <Select placeholder='请选择所属品类'>
            <Option value='0'>一级品类</Option>
            <Option value='1'>电脑</Option>
            <Option value='2'>主机</Option>
          </Select>
        </FormItem>
        <FormItem
          label='类别名称'
          name='categoryName'
          rules={[
            {
              required: true,
              message: "必填",
            },
          ]}>
          <Input placeholder='请输入类别名称' />
        </FormItem>
      </Form>
    );
  }
}
