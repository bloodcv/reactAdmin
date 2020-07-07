import React, { Component } from "react";
import { Card, Button, Table, Space, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

import "../../components/link-button";
import LinkButton from "../../components/link-button";
import AddForm from "./components/add-form";
import UpdateForm from "./components/update-form";
import {
  reqGetCategorys,
  reqAddCategorys,
  reqUpdateCategorys,
} from "../../api/index";
import { PAGE_SIZE } from "../../utils/constants";

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
  initColumns = () => {
    this.columns = [
      {
        title: "分类的名称",
        dataIndex: "name",
      },
      {
        title: "操作",
        width: 300,
        render: category => (
          <Space size='middle'>
            <LinkButton
              onClick={() => {
                this.showUpdate(category);
              }}>
              修改分类
            </LinkButton>
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
    // console.log("显示一级分类列表");
    // 更新为显示一级列表的状态
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    });
  };

  // 异步获取列表显示
  getCategorys = async parentId => {
    parentId = parentId || this.state.parentId;
    // console.log(parentId)
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
      if (this.state.parentId === "0" || parentId === "0") {
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
    // console.log("隐藏模态框");
    // this.form.current.resetFields();
    this.setState({
      showStatus: 0,
    });
  };

  // 显示添加分类
  showAdd = () => {
    // console.log("显示添加分类");
    this.setState({
      showStatus: 1,
    });
  };

  // 添加分类
  addCategory = async () => {
    // console.log("添加分类");
    // 进行表单验证， 只有通过验证才进行下一步
    try {
      let { parentId, categoryName } = await this.addForm.current.validateFields();
      // 1.隐藏确认框
      this.setState({
        showStatus: 0,
      });
      //准备数据
      // const { parentId, categoryName } = this.addForm.current.getFieldsValue();
      const addResult = await reqAddCategorys(parentId, categoryName);
      if (addResult.status === 0) {
        if (parentId === this.state.parentId) {
          this.getCategorys();
        } else if (parentId === "0") {
          this.getCategorys("0");
        }
      }
    } catch (error) {
      message.error("填写内容有误");
    }
  };

  // 显示更新分类
  showUpdate = category => {
    // console.log("显示更新分类");
    // 保存分类对象  如果还没有  指定空对象，防止报错
    this.category = category;
    // 更新对象
    this.setState({
      showStatus: 2,
    });
  };

  // 更新分类
  updateCategory = async () => {
    // console.log("更新分类");
    // 进行表单验证， 只有通过验证才进行下一步
    try {
      let { categoryName } = await this.updateForm.current.validateFields();
      // 1.隐藏确认框
      this.setState({
        showStatus: 0,
      });
      // 2.发请求更新分类
      // 准备数据
      const categoryId = this.category._id;
      // const categoryName = this.updateForm.current.getFieldValue("categoryName");
      // this.form.current.resetFields();
      const updateResult = await reqUpdateCategorys({
        categoryId,
        categoryName,
      });
      if (updateResult.status === 0) {
        // 3.更新显示列表
        this.getCategorys();
      } else {
        message.error("更新失败");
      }
    } catch (error) {
      message.error("填写内容有误");
    }
  };

  // 为第一次render准备数据
  componentWillMount() {
    this.initColumns();
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
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        />
        <Modal
          title='添加分类'
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}>
          <AddForm
            categorys={categorys}
            parentId={parentId}
            setForm={form => {
              this.addForm = form;
            }}
          />
        </Modal>
        <Modal
          title='更新分类'
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}>
          {/* 接收分类的名字 */}
          <UpdateForm
            categoryName={category.name}
            setForm={form => {
              this.updateForm = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}
