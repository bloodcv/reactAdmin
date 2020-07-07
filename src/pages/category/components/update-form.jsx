import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;

export default class UpdateForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  componentWillMount() {
    this.props.setForm(this.formRef);
  }

  /**
   * 当接收到新的属性时自动调用，在render之前，属于更新的状态
   */
  componentWillReceiveProps(nextProps) {
    const { categoryName } = nextProps;
    this.formRef.current.setFieldsValue({
      categoryName,
    });
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
              message: "类别名称必须输入",
            },
          ]}>
          <Input placeholder='请输入类别名称' />
        </FormItem>
      </Form>
    );
  }
}
