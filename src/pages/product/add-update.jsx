import React, { Component } from "react";
import { Card, Space, Form, Input, Button, InputNumber, Cascader } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";
import PicturesWall from "./pictures-wall";
import { reqGetCategorys } from "../../api";

const FormItem = Form.Item;
const { TextArea } = Input;

export default class ProductAddUpdate extends Component {
  state = {
    options: [],
  };

  constructor(props) {
    super(props);
    this.pw = React.createRef();
  }

  /**
   * 异步获取一级/二级分类列表，并显示
   * async函数的返回值是一个新的promise对象
   * promise的结果和值由async的结果决定
   */
  getCategorys = async parentId => {
    const result = await reqGetCategorys(parentId);
    if (result.status === 0) {
      const categorys = result.data;
      if (parentId === "0") {
        // 如果是一级分类列表
        this.initOptions(categorys);
      } else {
        // 如果是二级分类列表
        // 返回二级列表 ==> 当前async函数返回的promise就会是成功状态并且value值为categorys
        return categorys;
      }
    }
  };

  initOptions = async categorys => {
    // 根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false, //不是叶子节点
    }));

    // 如果是一个二级分类商品的更新
    const { product, isUpdate } = this;
    const { pCategoryId } = product;
    if (isUpdate && pCategoryId !== "0") {
      // 获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId);
      // 生成二级下拉列表的options
      const ChildOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      // 找到当前商品对应的一级option对象
      const targetOption = options.find(c => c.value === pCategoryId);
      // 关联到对应的一级option对象
      targetOption.children = [...ChildOptions];
    }

    // 更新options状态
    this.setState({
      options: [...options],
    });
  };

  /**
   * 加载下一级列表的回调函数
   */
  loadData = async selectedOptions => {
    // 得到选择的option对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 显示loading
    targetOption.loading = true;

    // 根据选中的分类，请求获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value);
    // 拿到数据，隐藏loading
    targetOption.loading = false;
    // 二级分类数组有数据
    if (subCategorys?.length > 0) {
      // 生成一个二级列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }));
      // 关联到当前option上
      targetOption.children = [...childOptions];
    } else {
      // 当前选中项没有二级分类
      targetOption.isLeaf = true;
    }
    this.setState({
      options: [...this.state.options],
    });
  };

  /**
   * 提交表单，新增商品
   */
  submitForm = values => {
    const imgs = this.pw.current.getImgs();
    console.log("提交表单，新增商品:", { values, imgs });
  };

  /**
   * 第一次render之前执行一次，为初始化数据做准备
   */
  componentWillMount() {
    // 准备修改商品信息的数据
    const product = this.props.location.state?.product;
    this.product = product || {};
    this.isUpdate = !!product;
  }

  /**
   * 第一次render之后执行一次，一般在这里做异步请求操作
   */
  componentDidMount() {
    this.getCategorys("0");
  }

  render() {
    const { options } = this.state;
    const { product, isUpdate } = this;
    const { pCategoryId, categoryId, imgs } = product;

    // 准备级联列表的数组
    const categoryIds = [];
    if (isUpdate) {
      if (pCategoryId === "0") {
        categoryIds.push(categoryId);
      } else {
        categoryIds.splice(0, 0, pCategoryId, categoryId);
      }
    }

    //指定Item布局的配置对象
    const layout = {
      labelCol: {
        //左侧label的宽度
        span: 5,
        md: { span: 4 },
        xl: { span: 2 },
      },
      wrapperCol: {
        // 右侧包裹的宽度
        span: 6,
      },
    };
    //指定Item布局中某一项的配置对象
    const submitLayout = {
      wrapperCol: {
        offset: 5,
        span: 16,
        md: { offset: 4 },
        xl: { offset: 2 },
      },
    };
    //指定Item布局中某一项的配置对象
    const imgLayout = {
      wrapperCol: {
        // 右侧包裹的宽度
        span: 18,
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
        <span>{this.isUpdate ? "修改商品" : "新增商品"}</span>
      </Space>
    );

    return (
      <Card className='product-addupdate' title={title} bordered={false}>
        <Form
          {...layout}
          name='addUpdateForm'
          onFinish={this.submitForm}
          initialValues={{
            name: product.name,
            desc: product.desc,
            price: product.price,
            categoryIds: categoryIds,
          }}>
          {/* 商品名称 */}
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
            <Input placeholder='请输入商品名称' />
          </FormItem>
          {/* 商品描述 */}
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
            <TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder='请输入商品描述' />
          </FormItem>
          {/* 商品价格 */}
          <FormItem
            label='商品价格'
            name='price'
            rules={[
              {
                required: true,
                type: "number",
                message: "请输入商品价格",
              },
            ]}>
            <InputNumber placeholder='请输入商品价格' className='addupdate-form-price' />
          </FormItem>
          {/* 商品分类 */}
          <FormItem
            label='商品分类'
            name='categoryIds'
            rules={[
              {
                required: true,
                type: "array",
                message: "请选择所属商品分类",
              },
            ]}>
            <Cascader options={options} loadData={this.loadData} />
          </FormItem>
          <FormItem {...imgLayout} label='商品图片'>
            <PicturesWall ref={this.pw} imgs={imgs} />
          </FormItem>
          <FormItem label='商品详情'>
            <span>商品详情</span>
          </FormItem>
          <FormItem {...submitLayout}>
            <Button type='primary' htmlType='submit'>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

/**
 * 1.子组件调用父组件的方法：将父组件的方法以函数属性的形式传递给子组件，子组件就可以调用
 * 2.父组件调用子组件的方法：在父组件中通过ref得到子组件标签对象（也就是组件对象），调用其方法
 */

/**
 * 使用ref
 * 1.创建ref容器：this.pw = React.createRef();  写在constructor中
 * 2.将ref容器交给需要获取的标签元素：<PicturesWall ref={this.pw}/>
 * 3.通过ref容器读取标签元素：this.pw.current
 */
