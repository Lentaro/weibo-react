import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";

import LoginUI from "./LoginUI";
import { login, cleanMsg } from "reducer/user.redux";

@connect(
  state => {
    return { user: state.user };
  },
  { login, cleanMsg }
)
export default class Login extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !is(nextProps.user, this.props.user);
  }
  componentWillUnmount() {
    this.props.cleanMsg();
  }
  register = () => {
    this.props.history.push("/register");
  };
  render() {
    // console.log(this.props);
    const { msg, redirectTo } = this.props.user.toJS();
    const { login } = this.props;
    return (
      <LoginUI
        register={this.register}
        login={login}
        msg={msg}
        redirect={redirectTo}
      />
    );
  }
}
