import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const { Option } = Select;

export default class AddForm extends Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  render() {
    const { categorys, parentId } = this.props

    return (
      <Form
        name='addform'
        initialValues={{
          parentId: parentId,
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
