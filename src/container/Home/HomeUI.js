import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";

import SendBlog from "component/SendBlog/SendBlog";
import BlogList from "container/BlogList/BlogList";
import "./HomeUI.less";

export default class HomeUI extends Component {
  static propTypes = {
    sendBlog: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    blogNum: PropTypes.number.isRequired,
    getWhoBlog: PropTypes.string.isRequired
  };

  render() {
    const {
      avatar,
      sendBlog,
      blogNum,
      update,
      nickname,
      getWhoBlog
    } = this.props;
    return (
      <Row gutter={12} className="home-box">
        <Col span={18} className="home-left">
          <SendBlog
            sendBlog={sendBlog}
            blogNum={blogNum}
            update={update}
            avatar={avatar}
            nickname={nickname}
          />
          <BlogList getWhoBlog={getWhoBlog} />
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
