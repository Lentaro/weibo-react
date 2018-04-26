import React, { Component } from "react";
import PropTypes from "prop-types";

import SendBlog from "component/SendBlog/SendBlog";
import { sendBlog } from "reducer/blog.redux";
import { connect } from "react-redux";

@connect(state => ({ user: state.user }), { sendBlog })
export default class Comment extends Component {
  static propTypes = {
    source: PropTypes.string.isRequired
  };
  render() {
    const { avatar, nickname } = this.props.user.toJS();
    const { sendBlog, source } = this.props;
    return (
      <SendBlog
        source={source}
        sendBlog={sendBlog}
        buttonSize="small"
        avatar={avatar}
        nickname={nickname}
        type="comment"
      />
    );
  }
}
