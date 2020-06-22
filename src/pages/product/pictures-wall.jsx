import React, { Component } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { BASE_IMG_URL } from "../../utils/constants";
import { reqRemovePic } from "../../api";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  /* state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "http://localhost:5000/upload/image-1592806902335.jpg",
      },
    ],
  }; */

  static propTypes = {
    imgs: PropTypes.array
  };

  constructor(props) {
    super(props);

    let fileList = [];

    const imgs = this.props.imgs;
    if(imgs?.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: BASE_IMG_URL + img,
      }))
    }

    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList
    }
  }

  getImgs = () => {
    return this.state.fileList.map(file => file.name);
  };

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    console.log("handleChange {file, fileList}", file, fileList);
    console.log(file.status);
    // 一旦上传成功， 将当前上传的file的信息修正（name, url）
    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        // 上传成功
        message.success("上传成功");
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        // 上传失败
        message.error(result.msg);
        fileList.pop();
      }
    } else if (file.status === 'removed') {
      // 删除图片
      const result = await reqRemovePic(file.name);
      if(result.status === 0) {
        // 删除成功
        message.success('删除成功');
      } else {
        // 删除失败
        message.error(result.msg);
        file.status = 'done';
        fileList.push(file)
      }
    }

    // 在操作（上传、删除）过程中更新fileList状态
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div>上传</div>
      </div>
    );

    return (
      <div>
        <Upload
          action='/manage/img/upload'
          accept="image/*"
          name='image'
          listType='picture-card'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}>
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt='img' style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
