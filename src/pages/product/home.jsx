import React, { Component } from 'react';
import { Card, Space, Select, Input, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export default class ProductHome extends Component {
  state = {
    products: []
  }

  initColumns = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name",
      }
    ]
  }

  /* 第一次render前调用一次，为第一次render准备数据 */
  componentWillMount() {
    this.initColumns()
  }

  render() {
    const {products} = this.state;

    const title = (
      <Space size='middle'>
        <Select defaultValue='1'>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按价格搜搜</Option>
        </Select>
        <Input placeholder='关键字' />
        <Button type='primary'>搜索</Button>
      </Space>
    );

    const extra = (
      <Button icon={<PlusOutlined />} type='primary'>
        新增商品
      </Button>
    );

    return (
      <Card title={title} extra={extra} bordered={false}>
        <Table
          rowKey="_id"
          bordered
          dataSource={products}
          columns={this.columns} />;
      </Card>
    );
  }
}
