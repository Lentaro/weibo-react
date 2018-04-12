import React, { Component } from "react";
import { connect } from "react-redux";

import { register, cleanMsg } from "reducer/user.redux";
import RegisterUI from "./RegisterUI";
@connect(state => state.user.toObject(), { register, cleanMsg })
class Register extends Component {
  componentWillMount() {
    this.props.cleanMsg();
  }
  render() {
    return <RegisterUI register={this.props.register} msg={this.props.msg} />;
  }
}

export default Register;
