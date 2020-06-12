import React, { Component } from "react";
import { Card, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";

export default class ProductAddUpdate extends Component {
  render() {
    const title = (
      <Space>
        <LinkButton
          onClick={() => {
            this.props.history.goBack();
          }}>
          <ArrowLeftOutlined />
        </LinkButton>
        <span>添加商品</span>
      </Space>
    );

    return (
      <Card title={title} bordered={false}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}
