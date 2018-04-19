import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Layout, Card, Form, Input, Button, DatePicker, Radio } from "antd";
import moment from "moment";
import { Redirect } from "react-router-dom";

import AvatarSelect from "component/AvatarSelect/AvatarSelect";
import "./UserInfoUI.less";

const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export default class UserInfoUI extends PureComponent {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    desc: PropTypes.string,
    sex: PropTypes.string,
    redirect: PropTypes.string,
    birthday: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("获得表单内容: ", values);
        this.props.update(values);
      }
    });
  };
  render() {
    // console.log(this.props);
    // console.log(this.props.user)
    // this.props.user
    // console.log(data)
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        lg: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        lg: {
          span: 10,
          offset: 1
        }
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
    // console.log(this.props)
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    const { nickname, birthday, desc, sex, avatar, redirectTo } = this.props;
    // console.log(avatar)
    // console.log(this.props.user)
    return (
      <Layout className="user-info-box">
        {redirectTo ? <Redirect to={redirectTo} /> : null}
        <Card title="个人信息" bordered={false}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="头像">
              {getFieldDecorator("avatar", {
                rules: [{ required: true, message: "请选择头像" }],
                initialValue: avatar
              })(<AvatarSelect />)}
            </FormItem>
            <FormItem {...formItemLayout} label="昵称">
              {getFieldDecorator("nickname", {
                rules: [{ required: true, message: "请输入昵称" }],
                initialValue: nickname
              })(<Input className="nickname-input" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="个人简介">
              {getFieldDecorator("desc", {
                rules: [{ required: false, message: "请输入简介" }],
                initialValue: desc
              })(<TextArea className="desc" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator("sex", {
                rules: [{ required: true, message: "请选择性别" }],
                initialValue: sex
              })(
                <RadioGroup>
                  <RadioButton value="man">男</RadioButton>
                  <RadioButton value="woman">女</RadioButton>
                  <RadioButton value="question-circle-o">保密</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="生日">
              {getFieldDecorator("birthday", {
                rules: [{ required: true, message: "请选择生日" }],
                initialValue: moment(birthday)
              })(<DatePicker />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                修改
              </Button>
            </FormItem>
          </Form>
        </Card>
      </Layout>
    );
  }
}

UserInfoUI = Form.create({})(UserInfoUI);
