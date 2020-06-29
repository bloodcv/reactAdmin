import React, { Component } from "react";
import { Card, Button, Space, Table, Modal, message } from "antd";

import { PAGE_SIZE } from "../../utils/constants";

import AddForm from "./add-form";
import { reqRoles, reqAddRole } from "../../api";
import AuthForm from "./auth-form";

export default class Role extends Component {
  state = {
    loading: false,
    roles: [],
    role: {},
    isShowAdd: false,
    isShowUpdate: false,
  };

  initColumns = () => {
    this.columns = [
      {
        title: "角色名称",
        dataIndex: "name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
      },
      {
        title: "授权时间",
        dataIndex: "auth_time",
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
      console.log("新增角色校验", roleName);
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
  updateRole = () => {
    console.log('配置角色权限')
  }

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
            this.setState({ isShowUpdate: true })
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
            this.setState({isShowUpdate: false})
          }}>
            <AuthForm role={role}/>
          </Modal>
      </Card>
    );
  }
}
