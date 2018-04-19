import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";

import { register, cleanMsg } from "reducer/user.redux";
import RegisterUI from "./RegisterUI";
@connect(state => ({ user: state.user }), { register, cleanMsg })
class Register extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !is(nextProps.user, this.props.user);
  }
  componentWillUnmount() {
    this.props.cleanMsg();
  }
  render() {
    const { register } = this.props;
    const { msg, redirectTo } = this.props.user.toJS();
    return <RegisterUI register={register} msg={msg} redirect={redirectTo} />;
  }
}

export default Register;
