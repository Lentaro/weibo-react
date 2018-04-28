import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";

import SendBlog from "component/SendBlog/SendBlog";
import BlogList from "container/BlogList/BlogList";
import "./HomeUI.less";

export default class HomeUI extends PureComponent {
  static propTypes = {
    sendBlog: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    blogNum: PropTypes.number.isRequired
  };
  // componentDidMount() {
  //   console.log(this.props.userId);
  // }
  // componentDidUpdate() {
  //   console.log(this.props.userId);
  // }
  render() {
    const { avatar, sendBlog, blogNum, update, nickname, userId } = this.props;
    // console.log(userId)
    return (
      <Row gutter={12} className="home-box">
        <Col span={18} className="home-left">
          <SendBlog
            sendBlog={sendBlog}
            blogNum={blogNum}
            update={update}
            avatar={avatar}
            nickname={nickname}
            inputHeight={100}
            placeholder="分享你的心情"
            multiLines={true}
            type="blog"
          />
          <BlogList id={userId} />
        </Col>
        <Col span={6} className="home-right">
          <div
            style={{
              width: "100%",
              height: "1rem",
              backgroundColor: "#909090"
            }}
          />
        </Col>
      </Row>
    );
  }
}
