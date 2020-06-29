import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;

export default class AddForm extends Component {
  static propTypes = {
    setForm: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.formRef = React.createRef();
  }

  componentWillMount() {
    this.props.setForm(this.formRef);
  }

  render() {
    return (
      <Form
        name='addForm'
        ref={this.formRef}
        initialValues={{
          roleName: "",
        }}>
        <FormItem
          label='角色名称'
          name='roleName'
          rules={[
            {
              required: true,
              message: "请输入角色名称",
            },
          ]}>
          <Input placeholder='请输入角色名称' />
        </FormItem>
      </Form>
    );
  }
}
