import React, { Component } from "react";
import { Card, Button, Space, Table, Modal, message } from "antd";

import { formatDate } from "../../utils/dateUtils";
import LinkButton from "../../components/link-button";
import { PAGE_SIZE } from "../../utils/constants";

export default class User extends Component {
  state = {
    users: [],
    roles: [],
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
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: formatDate,
      },
      {
        title: "操作",
        render: () => {
          return (
            <Space>
              <LinkButton>修改</LinkButton>
              <LinkButton>删除</LinkButton>
            </Space>
          );
        },
      },
    ];
  };

  componentWillMount() {
    this.initColumns();
  }

  render() {
    const { users, isShow } = this.state;
    const title = <Button type='primary'>新增用户</Button>;

    return (
      <Card title={title} bordered={false}>
        <Table
          bordered
          columns={this.columns}
          rowKey='_id'
          dataSource={users}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true
          }} />
          <Modal
            title="新增用户"
            visible={isShow}
            onOk={this.addOrUpdateUser}
            onCancel={() => {

            }}>
              
          </Modal>
      </Card>
    );
  }
}
