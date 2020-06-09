import React, { Component } from "react";
import { Card, Space, Select, Input, Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";
import { reqGetProducts, reqSrchProducts } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";

const { Option } = Select;

export default class ProductHome extends Component {
  state = {
    loading: false,
    total: 0,
    products: [],
    searchType: "productName",
    searchName: "",
  };

  /**
   * 初始化表头
   */
  initColumns = () => {
    this.columns = [
      {
        title: "商品名称",
        dataIndex: "name",
      },
      {
        title: "商品描述",
        dataIndex: "desc",
      },
      {
        title: "价格",
        dataIndex: "price",
        render: price => `¥${price}`,
      },
      {
        width: 100,
        title: "状态",
        dataIndex: "status",
        render: status => {
          return (
            <span>
              <Button type='primary'>{status === 1 ? "下架" : "上架"}</Button>
              {status === 1 ? "在售" : "已下架"}
            </span>
          );
        },
      },
      {
        width: 100,
        title: "操作",
        render: product => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          );
        },
      },
    ];
  };

  /**
   * 按页码获取商品列表
   */
  getProducts = async pageNum => {
    this.setState({ loading: true });
    const { searchName, searchType } = this.state;
    let resultProducts;
    if (searchName) {
      resultProducts = await reqSrchProducts({
        pageNum,
        pageSize: PAGE_SIZE,
        searchType,
        searchName
      })
    } else {
      resultProducts = await reqGetProducts({
        pageNum,
        pageSize: PAGE_SIZE,
      });
    }
    this.setState({ loading: false });
    if (resultProducts.status === 0) {
      const { total, list } = resultProducts.data;
      this.setState({
        total,
        products: list,
      });
    }
  };

  /**
   * 第一次render前调用一次，为第一次render准备数据
   */
  componentWillMount() {
    this.initColumns();
  }

  /**
   * 第一次render之后执行一次 一般异步调用数据在这里执行
   */
  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, loading, total, searchType, searchName } = this.state;

    const title = (
      <Space size='middle'>
        <Select
          value={searchType}
          onChange={value => this.setState({searchType: value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          value={searchName}
          onChange={e => this.setState({searchName: e.target.value})}/>
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
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
          rowKey='_id'
          bordered
          loading={loading}
          dataSource={products}
          columns={this.columns}
          pagination={{
            pageSize: PAGE_SIZE,
            total: total,
            showQuickJumper: true,
            onChange: this.getProducts,
          }}
        />
      </Card>
    );
  }
}
