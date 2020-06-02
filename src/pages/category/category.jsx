import React, { Component } from "react";
import { Card, Button, Table, Space, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

import "../../components/link-button";
import LinkButton from "../../components/link-button";
import AddForm from "./components/add-form";
import UpdateForm from './components/update-form'
import {
  reqGetCategorys,
  reqAddCategorys,
  reqUpdateCategorys,
} from "../../api/index";

export default class Category extends Component {
  state = {
    categorys: [], //一级分类列表
    subCategorys: [],
    loading: false,
    parentId: "0",
    parentName: "",
    showStatus: 0, // 0都不展示，1添加分类，2更新分类
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
        render: category => (
          <Space size='middle'>
            <LinkButton onClick={() => {this.showUpdate(category)}}>修改分类</LinkButton>
            {/* 如何向事件回调函数传递参数：先定义一个匿名函数，再函数调用处理的函数并传入参数 */}
            {this.state.parentId === "0" ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategorys(category);
                }}>
                查看子分类
              </LinkButton>
            ) : null}
          </Space>
        ),
      },
    ];
  };

  // 显示二级分类列表
  showSubCategorys = category => {
    // setState不能立即获取最新的状态，因为setState()是异步更新状态的
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        // 回调函数在状态更新且重新render()后执行
        // console.log(this.state.parentId, "回调后");
        this.getCategorys();
      }
    );
    // console.log(this.state.parentId, "回调前");
  };

  // 显示一级分类列表
  showCategorys = () => {
    console.log("显示一级分类列表");
    // 更新为显示一级列表的状态
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    });
  };

  // 异步获取列表显示
  getCategorys = async () => {
    const { parentId } = this.state;
    // 发送请求前 显示loading
    this.setState({ loading: true });
    // 发送异步ajax请求获取数据
    const result = await reqGetCategorys(parentId);
    // 在请求结束后 隐藏loading
    this.setState({ loading: false });
    if (result.status === 0) {
      // 取出分类数组数据，可能是一级的也可能是二级的
      const categorys = result.data;
      // 一级还是二级不同操作
      // 更新状态
      if (this.state.parentId === "0") {
        this.setState({
          categorys,
        });
      } else {
        this.setState({
          subCategorys: categorys,
        });
      }
    } else {
      message.error("获取分类列表失败");
    }
  };

  // 隐藏模态框
  handleCancel = () => {
    console.log("隐藏模态框");
    this.setState({
      showStatus: 0,
    });
  };

  // 显示添加分类
  showAdd = () => {
    console.log("显示添加分类");
    this.setState({
      showStatus: 1,
    });
  };

  // 添加分类
  addCategory = () => {
    console.log("添加分类");
  };

  // 显示更新分类
  showUpdate = (category) => {
    console.log("显示更新分类");
    // 保存分类对象  如果还没有  指定空对象，防止报错
    this.category = category;
    // 更新对象
    this.setState({
      showStatus: 2,
    });
  };

  // 更新分类
  updateCategory = () => {
    console.log("更新分类");
    // 1.隐藏确认框

    // 2.发请求更新分类
    // 准备数据
    const categoryName = this.updateForm.current.getFieldValue('categoryName');
    console.log(categoryName, '准备数据')
    // 3.更新显示列表
    // this.getCategorys();
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
    const {
      categorys,
      subCategorys,
      loading,
      parentId,
      parentName,
      showStatus,
    } = this.state;

    // 读取分类数据
    const category = this.category || {};

    const title =
      parentId === "0" ? (
        "一级分类列表"
      ) : (
        <span>
          <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
          <ArrowRightOutlined style={{ marginRight: 8 }} />
          <span>{parentName}</span>
        </span>
      );

    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <PlusOutlined />
        添加
      </Button>
    );

    return (
      <Card title={title} extra={extra} bordered={false}>
        <Table
          loading={loading}
          bordered
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          rowKey='_id'
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title='添加分类'
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}>
          <AddForm />
        </Modal>
        <Modal
          title='更新分类'
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}>
          {/* 接收分类的名字 */}
          <UpdateForm categoryName={category.name} getUpdateForm={(form) => {this.updateForm = form}} />
        </Modal>
      </Card>
    );
  }
}
