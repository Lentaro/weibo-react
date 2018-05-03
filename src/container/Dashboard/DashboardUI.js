import React, { PureComponent } from "react";
import { Modal, Layout, Menu, Icon } from "antd";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "container/Home/Home";
import Message from "container/Message/Message";
import Me from "container/Me/Me";
import UserInfo from "container/UserInfo/UserInfo";
import Logo from "component/Logo/Logo";
import "./DashboardUI.less";
import BackTop from "component/BackTop/BackTop";

const { Sider } = Layout;
const MenuItem = Menu.Item;
export default class DashboardUI extends PureComponent {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  };
  state = {
    logoutModal: false,
    collapse: false
  };
  componentDidUpdate() {
    this.node.scrollIntoView();
  }
  handleJump = e => {
    const { key } = e;
    // console.log(keyPath)
    // console.log(this.props.history)
    if (key === "logout") {
      return this.handleLogout();
    }
    if (this.props.pathname !== key) {
      // console.log(1)
      this.props.push(key);
    }
  };
  handleLogout = () => {
    this.setState({
      logoutModal: true
    });
  };
  handleCancel = () => {
    this.setState({
      logoutModal: false
    });
  };
  handleOk = () => {
    this.props.logout();
  };
  handleCollapse = () => {
    let collapse = this.state.collapse;
    // console.log(collapse);
    this.setState({
      collapse: !collapse
    });
  };
  render() {
    const list = [
      {
        path: "/home",
        text: "主页",
        icon: "home",
        component: Home
      },
      {
        path: "/message",
        text: "消息",
        icon: "mail",
        component: Message
      },
      {
        path: "/me",
        text: "我的",
        icon: "user",
        component: Me
      },
      {
        path: "/userinfo",
        text: "我的",
        icon: "user",
        component: UserInfo
      }
    ];
    // console.log(list[0].path)
    // console.log(page)
    const { pathname, redirect } = this.props;
    const page = list.find(v => v.path === pathname);
    return page ? (
      <div className="dashboard-box" ref={node => (this.node = node)}>
        {redirect ? <Redirect to={redirect} /> : null}
        <Layout className="dashboard-layout">
          <Sider
            collapsible
            className="dashboard-sider"
            onCollapse={this.handleCollapse}
          >
            <Logo />
            {/*defaultSelectedKeys的值预计为数组*/}
            <Menu
              theme="dark"
              defaultSelectedKeys={[pathname]}
              mode="inline"
              onClick={this.handleJump}
              className="sider-menu"
            >
              {list.map(v => {
                if (v.path === "/userinfo") {
                  return null;
                }
                return (
                  <MenuItem key={v.path}>
                    <Icon type={v.icon} />
                    <span>{v.text}</span>
                  </MenuItem>
                );
              })}
              <MenuItem key="logout" className="logout">
                <Icon type="logout" />
                <span>退出登录</span>
              </MenuItem>
              <Modal
                title="退出登录"
                visible={this.state.logoutModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认"
                cancelText="取消"
              >
                <p>确定退出登录吗？</p>
              </Modal>
            </Menu>
          </Sider>
          <Layout
            className="app-route"
            style={{ marginLeft: this.state.collapse ? "80px" : "200px" }}
          >
            <Switch>
              {list.map(v => (
                <Route key={v.path} path={v.path} component={v.component} />
              ))}
            </Switch>
          </Layout>
        </Layout>
        <BackTop />
      </div>
    ) : null;
  }
}
