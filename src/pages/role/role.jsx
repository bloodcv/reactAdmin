import React, { Component } from "react";
import { Card, Button, Space, Table } from "antd";
import { PAGE_SIZE } from "../../utils/constants";

export default class Role extends Component {
  state = {
    loading: false,
    roles: [],
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
  getRoles = () => {
    const roles = [
      {
        menus: ["/role", "/charts/bar", "/home", "/category"],
        _id: "5ca9eaa1b49ef916541160d3",
        name: "测试",
        create_time: 1554639521749,
        __v: 0,
        auth_time: 1558679920395,
        auth_name: "test007",
      },
      {
        menus: ["/role", "/charts/bar", "/home", "/charts/line", "/category", "/product", "/products"],
        _id: "5ca9eab0b49ef916541160d4",
        name: "经理",
        create_time: 1554639536419,
        __v: 0,
        auth_time: 1558506990798,
        auth_name: "test008",
      },
      {
        menus: ["/home", "/products", "/category", "/product", "/role"],
        _id: "5ca9eac0b49ef916541160d5",
        name: "角色1",
        create_time: 1554639552758,
        __v: 0,
        auth_time: 1557630307021,
        auth_name: "admin",
      },
    ];
    this.setState({
      roles
    })
  };

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { loading, roles } = this.state;

    const title = (
      <Space>
        <Button type='primary'>新增角色</Button>
        <Button type='primary' disabled>
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
        />
      </Card>
    );
  }
}
