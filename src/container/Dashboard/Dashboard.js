import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";

import { logout, cleanMsg } from "reducer/user.redux";
import DashboardUI from "./DashboardUI";
@connect(state => ({ user: state.user, component: state.component }), {
  logout,
  cleanMsg
})
export default class Dashboard extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      nextProps.location.pathname === this.props.location.pathname &&
      is(nextProps.user, this.props.user)
    );
  }
  componentWillUnmount() {
    this.props.cleanMsg();
  }
  push = url => {
    this.props.history.push(url);
  };
  render() {
    console.log(this.props);
    const { logout, handleCollapse } = this.props;
    const { redirectTo } = this.props.user.toJS();
    const { pathname } = this.props.location;
    return (
      <DashboardUI
        pathname={pathname}
        logout={logout}
        push={this.push}
        redirect={redirectTo}
        handleCollapse={handleCollapse}
      />
    );
  }
}
