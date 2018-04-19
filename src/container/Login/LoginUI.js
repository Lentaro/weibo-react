import React, { PureComponent } from "react";
import { Card, Form, Input, Icon, Checkbox, Button, Alert } from "antd";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import "./LoginUI.less";

export default class LoginUI extends PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    msg: PropTypes.string
  };

  state = {
    loginLoading: false,
    registerLoading: false
  };
  enterLoginLoading = () => {
    this.setState({ loginLoading: true });
  };

  enterRegisterLoading = () => {
    this.setState({ registerLoading: true });
    this.props.register();
  };
  handleSubmit = e => {
    //取消默认动作
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("获得表单内容: ", values);
        this.props.login(values);
      }
    });
  };
  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { loginLoading, registerLoading } = this.state;
    const { msg, redirect } = this.props;
    return (
      <div className="sign-up-bg">
        {redirect ? <Redirect to={redirect} /> : null}
        <Card title="登录" className="sign-up-card">
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(
                <Input prefix={<Icon type="user" />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  placeholder="Password"
                  type="password"
                />
              )}
            </FormItem>
            {msg ? (
              <Alert message={msg} type="error" showIcon closable />
            ) : null}
            <FormItem>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>记住密码</Checkbox>)}
              <a className="login-form-forgot">忘记密码</a>
              <Button
                type="primary"
                htmlType="submit"
                loading={loginLoading}
                onClick={this.enterLoginLoading}
                className="login-form-button"
              >
                登陆
              </Button>
              <Button
                type="primary"
                loading={registerLoading}
                onClick={this.enterRegisterLoading}
                id="to-register-button"
              >
                注册
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

//Form.create将表单包装起来，组件会带有this.props.form属性
LoginUI = Form.create({})(LoginUI);
