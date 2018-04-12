import React, { PureComponent } from "react";
import { Modal, Layout, Menu, Icon, Col } from "antd";
import PropTypes from "prop-types";

import Home from "component/Home/Home";
import Message from "component/Message/Message";
import Me from "component/Me/Me";
import UserInfo from "component/UserInfo/UserInfo";
import Logo from "component/Logo/Logo";

const { Sider } = Layout;
const MenuItem = Menu.Item;

export default class Dashboard extends PureComponent {
  static propTypes = {};

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
        icon: "message",
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
    // console.log(this.props)
    const { redirectTo } = this.props;
    const { pathname } = this.props.location;
    const page = list.find(v => v.path === pathname);
    // console.log(page)
    const user = this.props.username;
    return page ? (
      <Col className="dashborad-box" offset={4} span={16}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible>
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
          <Layout style={{ height: "100vh", padding: "24px" }}>
            {/* <Switch>
              {list.map(v=>(
                <Route key={v.path} path={v.path} component={v.component}></Route>
              ))}
            </Switch> */}
          </Layout>
        </Layout>
      </Col>
    ) : null;
  }
}
