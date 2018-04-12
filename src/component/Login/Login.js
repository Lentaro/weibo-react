import React, { Component } from "react";
import { connect } from "react-redux";

import LoginUI from "./LoginUI";
import { login, cleanMsg } from "reducer/user.redux";

@connect(state => state.user.toObject(), { login, cleanMsg })
export default class Login extends Component {
  componentWillMount() {
    // this.props.cleanMsg();
  }
  register = () => {
    this.props.history.push("/register");
  };
  render() {
    console.log(this.props);
    return (
      <LoginUI
        register={this.register}
        login={this.props.login}
        msg={this.props.msg}
      />
    );
  }
}
