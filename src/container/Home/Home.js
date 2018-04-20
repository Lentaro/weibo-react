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
    const { avatar, blogNum, nickname,id } = this.props.user.toJS();
    const { update, sendBlog } = this.props;
    return (
      <HomeUI
        avatar={avatar}
        sendBlog={sendBlog}
        blogNum={blogNum}
        update={update}
        nickname={nickname}
        getWhoBlog={id}
      />
    );
  }
}
