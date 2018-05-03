import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

import SendBlog from "component/SendBlog/SendBlog";
import { sendBlog } from "reducer/blog.redux";
import { connect } from "react-redux";
import CommentList from "container/CommentList/CommentList";

@connect(null, { sendBlog })
export default class Comment extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired
  };
  render() {
    const { sendBlog, source } = this.props;
    return (
      <Card bodyStyle={{ padding: " 0 12px" }}>
        <SendBlog
          source={source}
          sendBlog={sendBlog}
          buttonSize="small"
          type="comment"
        />
        <CommentList type="comment" id={source} />
      </Card>
    );
  }
}
