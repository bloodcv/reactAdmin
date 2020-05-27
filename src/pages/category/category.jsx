import React, { Component } from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "../../components/link-button";
import LinkButton from "../../components/link-button";

export default class Category extends Component {
  state = {
    title: "一级品类管理",
  };

  render() {
    const { title } = this.state;

    const extra = (
      <Button type='primary'>
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}
