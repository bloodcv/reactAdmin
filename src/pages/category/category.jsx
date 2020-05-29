import React, { Component } from "react";
import { Card, Button, Table, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "../../components/link-button";
import LinkButton from "../../components/link-button";
import {
  reqGetCategorys,
  reqAddCategorys,
  reqUpdateCategorys,
} from "../../api/index";

export default class Category extends Component {
  state = {
    title: "一级分类列表",
    categorys: [], //一级分类列表
    loading: false,
  };

  // 初始化table所有列的数组
  initColums = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "操作",
        key: "action",
        width: 300,
        render: (text, record) => (
          <Space size='middle'>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </Space>
        ),
      },
    ];
  };

  // 异步获取一级列表显示
  getCategorys = async () => {
    // 发送请求前 显示loading
    this.setState({ loading: true });
    // 发送异步ajax请求获取数据
    const result = await reqGetCategorys(0);
    // 在请求结束后 隐藏loading
    this.setState({ loading: false });
    if (result.status === 0) {
      const categorys = result.data;
      // 更新状态
      this.setState({
        categorys,
      });
    } else {
      message.error("获取分类列表失败");
    }
  };

  // 为第一次render准备数据
  componentWillMount() {
    this.initColums();
  }

  // 发送异步ajax请求，执行异步任务
  componentDidMount() {
    this.getCategorys();
  }

  render() {
    const { title, categorys, loading } = this.state;

    const extra = (
      <Button type='primary'>
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra} bordered={false}>
        <Table
          loading={loading}
          size='small'
          bordered
          dataSource={categorys}
          columns={this.columns}
          rowKey='_id'
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
      </Card>
    );
  }
}
