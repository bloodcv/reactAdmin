import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const FormItem = Form.Item;

export default class AuthForm extends Component {
  static propsTypes = {
    role: PropTypes.object,
  };

  render() {
    const { role } = this.props;

    return (
      <div>
        <FormItem label='角色名称'>
          <Input value={role.name} disabled></Input>
        </FormItem>
        {/* <Tree checkable>
          <TreeNode title='平台权限' key='all'>

          </TreeNode>
        </Tree> */}
      </div>
    );
  }
}
