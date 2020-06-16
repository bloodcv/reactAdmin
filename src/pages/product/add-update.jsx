import React, { Component } from "react";
import { Card, Space, Form, Input, Button, InputNumber, Cascader } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";
import { reqGetCategorys } from "../../api";

const FormItem = Form.Item;

export default class ProductAddUpdate extends Component {
  state = {
    options: [],
  };

  initOptions = async () => {
    const result = await reqGetCategorys("0");
    if (result.status === 0) {
      const options = result.data.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: false,
      }));
      this.setState({
        options: [...options],
      });
    }
  };

  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    



    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: "dynamic1",
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: "dynamic2",
        },
      ];
      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  };

  /**
   * 第一次render之后执行一次，为初始化数据做准备，一般在这里做异步请求操作
   */
  componentDidMount() {
    this.initOptions();
  }

  render() {
    const { options } = this.state;

    const onFinish = values => {
      console.log("Success:", values);
    };

    const layout = {
      labelCol: {
        span: 5,
        md: { span: 4 },
        xl: { span: 2 },
      },
      wrapperCol: {
        span: 6,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 5,
        span: 16,
        md: { offset: 4 },
        xl: { offset: 2 },
      },
    };

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
      <Card className='product-addupdate' title={title} bordered={false}>
        <Form {...layout} name='addUpdateForm' onFinish={onFinish}>
          <FormItem
            label='商品名称'
            name='name'
            rules={[
              {
                required: true,
                message: "请输入商品名称",
                whitespace: true,
              },
            ]}>
            <Input allowClear placeholder='请输入商品名称' />
          </FormItem>
          <FormItem
            label='商品描述'
            name='desc'
            rules={[
              {
                required: true,
                message: "请输入商品描述",
                whitespace: true,
              },
            ]}>
            <Input allowClear placeholder='请输入商品描述' />
          </FormItem>
          <FormItem
            label='商品价格'
            name='price'
            rules={[
              {
                required: "true",
                type: "number",
                message: "请输入商品价格",
              },
            ]}>
            <InputNumber placeholder='请输入商品价格' className='addupdate-form-price' />
          </FormItem>
          <FormItem label='商品分类'>
            <Cascader options={options} loadData={this.loadData} />
          </FormItem>
          <FormItem label='商品图片'>
            <span>商品图片</span>
          </FormItem>
          <FormItem label='商品详情'>
            <span>商品详情</span>
          </FormItem>
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
