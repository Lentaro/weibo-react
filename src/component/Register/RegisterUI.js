import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card, Form, Input, Icon, Button, Tooltip, Alert } from "antd";

import './RegisterUI.less'

export default class RegisterUI extends PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
    msg: PropTypes.string
  };
  state = {
    confirmDirty: false
  };
  handleSubmit = e => {
    //取消默认动作
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('获得表单内容: ',values)
        this.props.register(values);
      }
    });
  };
  //当焦点离开输入密码时
  handleConfirmBlur = e => {
    const value = e.target.value;
    // console.log(value)
    // 若此时输入框有内容或曾输入过内容则setState：confirmDirty为true,则启动校验
    // 若此栏为空则不再次对确认密码栏进行检测
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  // 当确认密码栏改变时
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    // 获取密码栏输入的值与本栏进行对比
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码不同");
    } else {
      callback();
    }
  };
  // 当第一次输入的密码内容改变时
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      // 对确认密码一栏进行检测 force:true保证已经校验过的栏再次校验
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { msg } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 18,
          offset: 5
        }
      }
    };
    return (
      <div className="sign-up-bg">
        <Card title="注册" id="register-card">
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="用户名">
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "请输入用户名" }]
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "请输入密码" },
                  // 自定义校验
                  { validator: this.validateToNextPassword }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="确认密码">
              {getFieldDecorator("confirm", {
                rules: [
                  { required: true, message: "请确认密码" },
                  // 自定义校验
                  { validator: this.compareToFirstPassword }
                ]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  昵称
                  <Tooltip title="你想让好友如何称呼您？">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("nickname", {
                rules: [{ required: true, message: "请输入昵称" }]
              })(<Input />)}
            </FormItem>
            {msg ? (
              <Alert message={msg} type="error" showIcon closable />
            ) : null}
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
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
RegisterUI = Form.create({})(RegisterUI)
