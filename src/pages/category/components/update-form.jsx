import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;

export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string,
    getUpdateForm: PropTypes.func.isRequired,
  };

  formRef = React.createRef();

  componentWillMount() {
    console.log(this.props, this.formRef)
    this.props.getUpdateForm(this.formRef);
  }

  render() {
    const { categoryName } = this.props;

    return (
      <Form
        name='updateForm'
        ref={this.formRef}
        initialValues={{
          categoryName: categoryName,
        }}
        layout='vertical'>
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
