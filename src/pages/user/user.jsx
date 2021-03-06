import React, { Component } from "react";
import { Card, Button, Space, Table, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { formatDate } from "../../utils/dateUtils";
import LinkButton from "../../components/link-button";
import { PAGE_SIZE } from "../../utils/constants";
import { reqUsers, reqAddOrUpdateUser, reqRemoveUser } from "../../api";
import UserForm from "./user-form";

const Confirm = Modal.confirm;

export default class User extends Component {
  state = {
    users: [],
    roles: [],
    user: {},
    isShow: false,
  };

  /**
   * 初始化列表表头
   */
  initColumns = () => {
    this.columns = [
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "联系方式",
        dataIndex: "phone",
      },
      {
        title: "邮箱",
        dataIndex: "email",
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        render: role_id => this.roleNames[role_id],
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: formatDate,
      },
      {
        title: "操作",
        render: user => {
          return (
            <Space>
              <LinkButton
                onClick={() => {
                  this.showUpdate(user);
                }}>
                修改
              </LinkButton>
              <LinkButton
                onClick={() => {
                  this.removeUser(user);
                }}>
                删除
              </LinkButton>
            </Space>
          );
        },
      },
    ];
  };

  /**
   * 生成角色对象{role_id: role.name, ...}
   */
  initRoleNames = roles => {
    this.roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
  };

  /**
   * 获取用户列表
   */
  getUsers = async () => {
    const result = await reqUsers();
    if (result.status === 0) {
      const { users, roles } = result.data;
      this.initRoleNames(roles);
      this.setState({
        users,
        roles,
      });
    }
  };

  /**
   * 显示修改用户的界面
   */
  showUpdate = user => {
    // 保存 user
    this.user = user;
    this.setState({
      isShow: true,
    });
  };

  /**
   * 显示添加用户的界面
   */
  showAddUser = () => {
    this.user = null;
    this.setState({
      isShow: true,
    });
  };

  /**
   * 新增/修改用户
   */
  addOrUpdateUser = async () => {
    try {
      const formValues = await this.form.current.validateFields();
      if(this.user) {
        formValues._id = this.user._id;
      }
      // console.log('formValues', formValues)
      const result = await reqAddOrUpdateUser(formValues);
      if (result.status === 0) {
        message.success(`${this.user ? '修改' : '新增'}成功`);
        this.setState({
          isShow: false
        });
        this.getUsers();
        this.form.current.resetFields();
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 删除用户
   */
  removeUser = user => {
    Confirm({
      title: "删除用户",
      icon: <ExclamationCircleOutlined />,
      content: `确定删除用户：${user.username}`,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        const result = await reqRemoveUser(user._id);
        if (result.status === 0) {
          message.success(`删除用户${user.username}成功`);
          this.getUsers();
        } else {
          message.error(`删除用户${user.username}失败`);
        }
      },
    });
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { users, roles, isShow } = this.state;
    const user = this.user || {};

    const title = (
      <Button type='primary' onClick={this.showAddUser}>
        新增用户
      </Button>
    );

    return (
      <Card title={title} bordered={false}>
        <Table
          bordered
          columns={this.columns}
          rowKey='_id'
          dataSource={users}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
          }}
        />
        <Modal
          title='新增用户'
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.setState({ isShow: false });
            // this.form.current.resetFields();
          }}>
          <UserForm setForm={form => (this.form = form)} roles={roles} user={user} />
        </Modal>
      </Card>
    );
  }
}
