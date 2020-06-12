import React, { Component } from "react";
import { Space, Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";
import { reqGetCategoryInfo } from "../../api";
import img1 from "../../assets/imgs/img1.jpg";
import img2 from "../../assets/imgs/img2.jpg";
import img3 from "../../assets/imgs/img3.jpg";
import img4 from "../../assets/imgs/img4.jpg";
import img5 from "../../assets/imgs/img5.jpg";

const ListItem = List.Item;

export default class ProductDetail extends Component {
  state = {
    categoryName1: "",
    categoryName2: "",
  };

  /**
   * 根据父级id和自身id获取当前品类的对应分类名
   */
  getCategoryName = async () => {
    const { pCategoryId, categoryId } = this.props.location.state.product;
    if (pCategoryId === "0") {
      // 如果当前就是父级商品
      const resultCategoryInfo = await reqGetCategoryInfo(categoryId);
      if (resultCategoryInfo.status === 0) {
        this.setState({
          categoryName1: resultCategoryInfo.data.name,
        });
      }
    } else {
      // 通过多个await方式发送多个请求: 后面一个请求是在前一个请求成功返回之后才发送
      /*
        let categoryName1 = "";
        let categoryName2 = "";
        const resultCategoryInfo1 = await reqGetCategoryInfo(pCategoryId);
        if (resultCategoryInfo1.status === 0) {
          categoryName1 = resultCategoryInfo1.data.name;
        }
        const resultCategoryInfo2 = await reqGetCategoryInfo(categoryId);
        if (resultCategoryInfo2.status === 0) {
          categoryName2 = resultCategoryInfo2.data.name;
        }
        this.setState({
          categoryName1,
          categoryName2
        })
      */

      // 一次性发送多个请求, 只有都成功了, 才正常处理 Promise.all
      let categoryName1 = "";
      let categoryName2 = "";
      // const resultCategoryInfo = await Promise.all([reqGetCategoryInfo(pCategoryId), reqGetCategoryInfo(categoryId)]);
      /* if (resultCategoryInfo[0].status === 0 && resultCategoryInfo[1].status === 0) {
        categoryName1 = resultCategoryInfo[0].data.name;
        categoryName2 = resultCategoryInfo[1].data.name;
      } */
      this.setState({
        categoryName1,
        categoryName2,
      });
    }
  };

  /**
   * 在第一次render之后执行一次，请求数据一般在这里做
   */
  componentDidMount() {
    this.getCategoryName();
  }

  render() {
    const { name, desc, price, detail } = this.props.location.state.product;
    /* 商品名称
    商品描述
    商品价格
    所属分类
    商品图片
    商品详情 */

    const { categoryName1, categoryName2 } = this.state;

    const imgs = [
      {
        src: img1,
        name: "img1",
        id: 1,
      },
      {
        src: img2,
        name: "img2",
        id: 2,
      },
      {
        src: img3,
        name: "img3",
        id: 3,
      },
      {
        src: img4,
        name: "img4",
        id: 4,
      },
      {
        src: img5,
        name: "img5",
        id: 5,
      },
    ];

    const title = (
      <Space>
        <LinkButton
          onClick={() => {
            this.props.history.goBack();
          }}>
          <ArrowLeftOutlined />
        </LinkButton>
        <span>商品详情</span>
      </Space>
    );

    return (
      <Card className='product-detail' title={title} bordered={false}>
        <List bordered={false}>
          <ListItem className='list-wrap'>
            <span className='list-title'>商品名称:</span>
            <span>{name}</span>
          </ListItem>
          <ListItem className='list-wrap'>
            <span className='list-title'>商品描述:</span>
            <span>{desc}</span>
          </ListItem>
          <ListItem className='list-wrap'>
            <span className='list-title'>商品价格:</span>
            <span>¥ {price}</span>
          </ListItem>
          <ListItem className='list-wrap'>
            <span className='list-title'>所属分类:</span>
            <span>
              {categoryName1} {categoryName2 ? `--> ${categoryName2}` : null}
            </span>
          </ListItem>
          <ListItem className='list-wrap'>
            <span className='list-title'>商品图片:</span>
            <div className='list-img-wrap'>
              {imgs.map(img => (
                <Card hoverable key={img.id}>
                  <img src={img.src} alt={img.name} />
                </Card>
              ))}
            </div>
          </ListItem>
          <ListItem className='list-wrap'>
            <span className='list-title'>商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </ListItem>
        </List>
      </Card>
    );
  }
}
