import React, { Component } from "react";
import { Card, Button, Table, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "../../components/link-button";
import LinkButton from "../../components/link-button";
// import { reqGetCategorys, reqAddCategorys, reqUpdateCategorys } from "../../api/index";

export default class Category extends Component {
  state = {
    title: "一级品类列表",
  };

  render() {
    const { title } = this.state;

    const extra = (
      <Button type='primary'>
        <PlusOutlined />
        添加
      </Button>
    );

    const dataSource = [
      {
        parentId: "0",
        _id: "5ecf2f6681502c5e30a34c64",
        name: "一级分类1",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d5381502c5e30a34c65",
        name: "一级分类2",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d7981502c5e30a34c66",
        name: "一级分类3",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d7b81502c5e30a34c67",
        name: "一级分类4",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d7e81502c5e30a34c68",
        name: "一级分类5",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d8181502c5e30a34c69",
        name: "一级分类6",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d8381502c5e30a34c6a",
        name: "一级分类7",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d8681502c5e30a34c6b",
        name: "一级分类8",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d8981502c5e30a34c6c",
        name: "一级分类9",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d8d81502c5e30a34c6d",
        name: "一级分类10",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d9181502c5e30a34c6e",
        name: "一级分类11",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d9481502c5e30a34c6f",
        name: "一级分类12",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d9681502c5e30a34c70",
        name: "一级分类13",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d9881502c5e30a34c71",
        name: "一级分类14",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d9a81502c5e30a34c72",
        name: "一级分类15",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d9d81502c5e30a34c73",
        name: "一级分类16",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4d9f81502c5e30a34c74",
        name: "一级分类17",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4da181502c5e30a34c75",
        name: "一级分类18",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4da481502c5e30a34c76",
        name: "一级分类19",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4da781502c5e30a34c77",
        name: "一级分类20",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4da981502c5e30a34c78",
        name: "一级分类21",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dab81502c5e30a34c79",
        name: "一级分类22",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dae81502c5e30a34c7a",
        name: "一级分类23",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4db081502c5e30a34c7b",
        name: "一级分类24",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4db381502c5e30a34c7c",
        name: "一级分类25",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4db581502c5e30a34c7d",
        name: "一级分类26",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4db781502c5e30a34c7e",
        name: "一级分类27",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dba81502c5e30a34c7f",
        name: "一级分类28",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dbc81502c5e30a34c80",
        name: "一级分类29",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dbe81502c5e30a34c81",
        name: "一级分类30",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dc181502c5e30a34c82",
        name: "一级分类31",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dc381502c5e30a34c83",
        name: "一级分类32",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dc781502c5e30a34c84",
        name: "一级分类33",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dc981502c5e30a34c85",
        name: "一级分类34",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dcb81502c5e30a34c86",
        name: "一级分类35",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dce81502c5e30a34c87",
        name: "一级分类36",
        __v: 0,
      },
      {
        parentId: "0",
        _id: "5ecf4dd081502c5e30a34c88",
        name: "一级分类37",
        __v: 0,
      },
    ];

    const columns = [
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

    return (
      <Card title={title} extra={extra} bordered={false}>
        <Table size="small" bordered dataSource={dataSource} columns={columns} rowKey='_id' />
      </Card>
    );
  }
}
