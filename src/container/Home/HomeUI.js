import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Col, Row, Card } from "antd";

import SendBlog from "component/SendBlog/SendBlog";
import BlogList from "container/BlogList/BlogList";
import "./HomeUI.less";

const CardGrid = Card.Grid;
export default class HomeUI extends PureComponent {
  static propTypes = {
    sendBlog: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    blogNum: PropTypes.number.isRequired,
    fans: PropTypes.array,
    follow: PropTypes.array
  };
  render() {
    const { sendBlog, blogNum, update, userId, fans, follow } = this.props;
    // console.log(userId)
    return (
      <Row gutter={12} className="home-box">
        <Col
          lg={{ span: 7, push: 17 }}
          md={{ span: 24 }}
          className="home-right"
        >
          <Card className="follow-plate" bodyStyle={{ padding: "0px" }}>
            <CardGrid>
              <strong>{follow.length}</strong>
              <span>关注</span>
            </CardGrid>
            <CardGrid>
              <strong>{fans.length}</strong>
              <span>粉丝</span>
            </CardGrid>
            <CardGrid>
              <strong>{blogNum}</strong>
              <span>博客</span>
            </CardGrid>
          </Card>
        </Col>
        <Col lg={{ span: 17, pull: 7 }} md={{ span: 24 }} className="home-left">
          <SendBlog
            sendBlog={sendBlog}
            blogNum={blogNum}
            update={update}
            inputHeight={100}
            placeholder="分享你的心情"
            multiLines={true}
            type="blog"
          />
          <BlogList id={userId} />
        </Col>
      </Row>
    );
  }
}
