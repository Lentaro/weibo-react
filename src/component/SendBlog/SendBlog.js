// 此组件可在父级调用时传入
// inputHeight（控制输入框高度 string）
// placeholder（输入框提示 string）
// buttonSize （发送按钮大小 string（small，large 或 null））
// multiLines （多行模式 boolean）
// type （发送的类型 string （blog,cite,comment） ）

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Mention, Button, Card } from "antd";

import "./SendBlog.less";

const { toContentState, toString, getMentions } = Mention;

export default class SendBlog extends PureComponent {
  static propTypes = {
    sendBlog: PropTypes.func.isRequired,
    blogNum: PropTypes.number,
    update: PropTypes.func,
    inputHeight: PropTypes.number,
    placeholder: PropTypes.string,
    buttonSize: PropTypes.string,
    multiLines: PropTypes.bool,
    type: PropTypes.string.isRequired,
    source: PropTypes.string,
    sourceList: PropTypes.array
  };
  state = {
    mentionValue: toContentState(""),
    sendValue: {
      value: "",
      mentions: "",
      type: "",
      source: ""
    }
  };
  handleChange = value => {
    // console.log(value);
    const contentValue = toString(value);
    const mentions = getMentions(value);
    this.setState({
      mentionValue: value,
      sendValue: {
        value: contentValue,
        mentions: mentions,
        type: this.props.type,
        source:
          this.props.type === "comment"
            ? this.props.source
            : this.props.sourceList
      }
    });
  };
  handleSend = () => {
    // console.log(this.state.sendValue);
    this.setState({
      mentionValue: toContentState("")
    });
    this.props.sendBlog(this.state.sendValue);
    if (this.props.type === "blog" || this.props.type === "cite") {
      this.props.update({ blogNum: this.props.blogNum + 1 });
    }
  };
  render() {
    // console.log(!!toString(this.state.mentionValue))
    const {
      inputHeight,
      placeholder,
      buttonSize,
      multiLines,
      type
    } = this.props;
    return (
      <Card
        className="send-card"
        bodyStyle={
          type === "comment" || type === "cite"
            ? { padding: "12px 0 0 0" }
            : { padding: "12px 12px 8px 12px" }
        }
        bordered={type === "blog" ? true : false}
      >
        <Mention
          className="send-input"
          style={{ width: "100%", height: inputHeight }}
          placeholder={placeholder}
          onChange={this.handleChange}
          defaultValue={
            this.props.defaultValue
              ? toContentState(this.props.defaultValue)
              : null
          }
          value={this.state.mentionValue}
          multiLines={multiLines}
        />
        <div className="send-actions">
          <Button
            type="primary"
            className="send-now"
            onClick={this.handleSend}
            disabled={!toString(this.state.mentionValue)}
            size={buttonSize ? buttonSize : "default"}
          >
            {type === "comment" ? "评论" : type === "cite" ? "转发" : "发送"}
          </Button>
        </div>
      </Card>
    );
  }
}
