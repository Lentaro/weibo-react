import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";

import { cleanMsg } from "reducer/user.redux";
import MeUI from "./MeUI";

@connect(
  state => {
    return { user: state.user };
  },
  { cleanMsg }
)
export default class Me extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !is(nextProps.user, this.props.user);
  }
  componentWillUnmount() {
    this.props.cleanMsg();
  }
  push = url => {
    this.props.history.push(url);
  };
  render() {
    // console.log(this.props);
    const {
      avatar,
      nickname,
      sex,
      desc,
      follow,
      fans,
      blogNum,
      birthday
    } = this.props.user.toJS();
    return (
      <MeUI
        avatar={avatar}
        nickname={nickname}
        sex={sex}
        desc={desc}
        follow={follow}
        fans={fans}
        blogNum={blogNum}
        birthday={birthday}
        push={this.push}
      />
    );
  }
}
