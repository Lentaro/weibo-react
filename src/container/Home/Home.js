import React, { Component } from "react";
import { is } from "immutable";

import HomeUI from "./HomeUI";
import { update } from "reducer/user.redux";
import { sendBlog } from "reducer/blog.redux";
import { connect } from "react-redux";

@connect(state => ({ user: state.user }), { sendBlog, update })
export default class Home extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !is(nextProps.user, this.props.user);
  }
  render() {
    // console.log(this.props);
    const {
      avatar,
      blogNum,
      nickname,
      id,
      fans,
      follow
    } = this.props.user.toJS();
    const { update, sendBlog } = this.props;
    // console.log(id);
    return (
      <HomeUI
        avatar={avatar}
        blogNum={blogNum}
        fans={fans}
        sendBlog={sendBlog}
        follow={follow}
        update={update}
        nickname={nickname}
        userId={id}
      />
    );
  }
}
