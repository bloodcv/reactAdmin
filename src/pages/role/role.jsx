import React, { Component } from "react";
import { Card, Button, Space, Table, Modal, message } from "antd";

import { PAGE_SIZE } from "../../utils/constants";

import AddForm from "./add-form";
import AuthForm from "./auth-form";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import { formatDate } from "../../utils/dateUtils";

export default class Role extends Component {
  state = {
    loading: false,
    roles: [],
    role: {},
    isShowAdd: false,
    isShowUpdate: false,
  };

  constructor(props) {
    super(props);

    this.authFromRef = React.createRef();
  }

  initColumns = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: formatDate,
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
        render: formatDate,
      },
      {
        title: "授权人",
        dataIndex: "auth_name",
      },
    ];
  };

  /**
   * 获取角色列表
   */
  getRoles = async () => {
    const result = await reqRoles();
    if (result.status === 0) {
      const roles = result.data;
      this.setState({
        roles,
      });
    }
  };

  /**
   * 单行选中
   */
  rowClick = role => {
    this.setState({
      role,
    });
  };

  /**
   * 新增角色
   */
  addRole = async () => {
    try {
      const { roleName } = await this.addForm.current.validateFields();
      // console.log("新增角色校验", roleName);
      const result = await reqAddRole(roleName);
      if (result.status === 0) {
        this.setState({
          isShowAdd: false,
        });
        message.success("新增成功");
        // 远程更新列表
        // this.getRoles();

        // 本地更新列表
        /*const roles = this.state.roles
          roles.push(role)
          this.setState({
          roles
        })*/

        const role = result.data;
        this.setState(state => ({
          roles: [...state.roles, role],
        }));
      } else {
        message.error("新增失败");
      }
    } catch (error) {
      console.error("新增角色确定error", error);
    }
  };

  /**
   * 配置角色权限
   */
  updateRole = async () => {
    // console.log("配置角色权限");
    const role = this.state.role;
    role.menus = this.authFromRef.current.getNewMenus();
    role.auth_time = Date.now();
    role.auth_name = memoryUtils.user.username;

    const result = await reqUpdateRole(role);
    if (result.status === 0) {
      message.success("更新成功");
      this.setState({
        isShowUpdate: false,
        roles: [...this.state.roles],
      });
    } else {
      message.error("更新失败");
    }
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { loading, roles, role, isShowAdd, isShowUpdate } = this.state;

    const title = (
      <Space>
        <Button
          type='primary'
          onClick={() => {
            this.setState({ isShowAdd: true });
          }}>
          新增角色
        </Button>
        <Button
          type='primary'
          disabled={!role._id}
          onClick={() => {
            this.setState({ isShowUpdate: true });
          }}>
          配置角色权限
        </Button>
      </Space>
    );

    return (
      <Card title={title} bordered={false}>
        <Table
          loading={loading}
          bordered
          dataSource={roles}
          columns={this.columns}
          rowKey='_id'
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.rowClick(role)
            }
          }}
          onRow={role => {
            return {
              onClick: event => this.rowClick(role), // 点击行
            };
          }}
        />
        <Modal
          title='新增角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false });
            this.addForm.current.resetFields();
          }}>
          <AddForm setForm={form => (this.addForm = form)} />
        </Modal>
        <Modal
          title='配置角色权限'
          visible={isShowUpdate}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowUpdate: false });
          }}>
          <AuthForm role={role} ref={this.authFromRef} />
        </Modal>
      </Card>
    );
  }
}
