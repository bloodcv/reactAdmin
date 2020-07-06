import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import menuList from "../../config/menuConfig";

const FormItem = Form.Item;

export default class AuthForm extends Component {
  static propsTypes = {
    role: PropTypes.object,
  };

  constructor(props) {
    super(props);

    const checkedKeys = this.props.role.menus || [];

    this.state = {
      checkedKeys
    };
  }

  /**
   * 获取树节点dom
   */
  getTreeData = menuList => {
    return [
      {
        title: '平台权限',
        key: 'all',
        children: [
          ...menuList
        ]
      }
    ]
  };

  /**
   * 树节点选中/取消的时候
   */
  onCheck = checkedKeys => {
    // console.log("树节点选中/取消的时候", checkedKeys);
    this.setState({
      checkedKeys
    })
  };

  /**
   * 获取选中的节点
   */
  getNewMenus = () => this.state.checkedKeys

  componentWillMount() {
    this.treeData = this.getTreeData(menuList);
  }

  /**
   * 当接收新的属性值的时候调用，在render之前，属于更新的阶段
   */
  componentWillReceiveProps(nextProps) {
    const checkedKeys = nextProps.role.menus || [];
    this.setState({
      checkedKeys
    })
  }

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;

    return (
      <div>
        <FormItem label='角色名称'>
          <Input value={role.name} disabled></Input>
        </FormItem>
        <Tree checkable defaultExpandAll checkedKeys={checkedKeys} onCheck={this.onCheck} treeData={this.treeData}></Tree>
      </div>
    );
  }
}
