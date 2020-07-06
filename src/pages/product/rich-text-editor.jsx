/**
 * 添加更新产品-富文本编辑器
 */
import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// draft 转换为 html
import draftToHtml from "draftjs-to-html";
// html 转换为 draft
import htmlToDraft from "html-to-draftjs";
import PropTypes from "prop-types";

export default class RichTextEditor extends Component {
  static propTypes = {
    detail: PropTypes.string,
  };

  constructor(props) {
    super(props);
    const { detail } = this.props;
    // let editorState = EditorState.createEmpty();
    if (detail) {
      // 匹配富文本编辑器格式，回显保存的内容
      const contentBlock = htmlToDraft(detail);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        // console.log("有detail");
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState,
        };
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
      };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    /* this.setState(
      {
        editorState
      },
      () => {
        // 如果是插入图片
        if(editorState?._immutable.lastChangeType === 'insert-fragment') {
          // 取出html重新转化
          const detail = '<div>' + draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) + '</div>';
          console.log('detail', detail)
          const contentBlock = htmlToDraft(detail);
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState2 = EditorState.createWithContent(contentState);
          this.setState({
            editorState: editorState2
          });
        }
      }
    ); */
  };

  /**
   * 上传图片
   */
  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/manage/img/upload");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve({ data: { link: response.data.url } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  /**
   * 获取html
   */
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
  };

  render() {
    const { editorState } = this.state;
    const setToolbar = {
      image: {
        urlEnabled: false,
        uploadEnabled: true,
        alignmentEnabled: true,
        previewImage: true,
        inputAccept: "image/gif,image/jpeg,image/jpg,image/png",
        uploadCallback: this.uploadImageCallBack,
        alt: { present: false, mandatory: false },
      },
    };

    return (
      <Editor
        editorState={editorState}
        editorStyle={{ border: "1px solid #F1F1F1", padding: "0 8px", minHeight: 200, maxHeight: 300 }}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={setToolbar}
      />
    );
  }
}
