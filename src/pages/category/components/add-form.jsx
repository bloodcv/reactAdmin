import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;
const { Option } = Select;

export default class AddForm extends Component {
  static propTypes = {
    categorys: PropTypes.array.isRequired,
    parentId: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  };

  formRef = React.createRef();

  componentWillMount() {
    this.props.setForm(this.formRef);
  }

  componentWillReceiveProps(nextProps) {
    const { categorys, parentId } = nextProps;
    this.formRef.current.setFieldsValue({ categorys, parentId, categoryName: "" });
  }

  render() {
    const { categorys, parentId } = this.props;

    return (
      <Form
        name='addform'
        ref={this.formRef}
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
              message: "所属类别必选",
            },
          ]}>
          <Select placeholder='请选择所属品类'>
            <Option value='0'>一级品类</Option>
            {categorys.map(item => (
              <Option value={item._id} key={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          label='类别名称'
          name='categoryName'
          rules={[
            {
              required: true,
              message: "类别名称必须输入",
            },
          ]}>
          <Input placeholder='请输入类别名称' />
        </FormItem>
      </Form>
    );
  }
}
