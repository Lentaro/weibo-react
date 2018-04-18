import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Mention, Button, Card } from "antd";

import "./SendBlog.less";

const { toContentState, toString, getMentions } = Mention;

export default class SendBlog extends PureComponent {
  static propTypes = {
    sendBlog: PropTypes.func.isRequired,
    blogNum: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired
  };
  state = {
    mentionValue: toContentState(""),
    sendValue: {
      value: "",
      mentions: "",
      avatar: "",
      nickname: ""
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
        avatar: this.props.avatar,
        nickname: this.props.nickname
      }
    });
  };
  handleSend = () => {
    // console.log(this.state.sendValue);
    this.setState({
      mentionValue: toContentState("")
    });
    this.props.sendBlog(this.state.sendValue);
    this.props.update({ blogNum: this.props.blogNum + 1 });
  };
  render() {
    return (
      <Card className="send-card" bodyStyle={{ padding: "12px 12px 8px 12px" }}>
        <Mention
          className="send-input"
          style={{ width: "100%", height: 100 }}
          multiLines
          placeholder="分享你的心情"
          onChange={this.handleChange}
          value={this.state.mentionValue}
        />
        <div className="send-actions">
          <Button type="primary" className="send-now" onClick={this.handleSend}>
            发送
          </Button>
        </div>
      </Card>
    );
  }
}
