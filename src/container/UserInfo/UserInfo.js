import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";

import { update, cleanMsg } from "reducer/user.redux";
import UserInfoUI from "./UserInfoUI";

@connect(state => ({ user: state.user }), { update, cleanMsg })
export default class UserInfo extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !is(nextProps.user, this.props.user);
  }
  componentWillUnmount() {
    this.props.cleanMsg();
  }
  render() {
    // console.log(this.props);
    const { update } = this.props;
    const {
      nickname,
      birthday,
      desc,
      sex,
      avatar,
      redirectTo
    } = this.props.user.toJS();

    // console.log(this.props);
    return (
      <UserInfoUI
        nickname={nickname}
        birthday={birthday}
        desc={desc}
        sex={sex}
        avatar={avatar}
        redirect={redirectTo}
        update={update}
      />
    );
  }
}
