import React, { PureComponent } from "react";
import { Row, Layout, Card, Col, Avatar, Icon } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

import "./MeUI.less";
import BlogList from "container/BlogList/BlogList";
import BackTop from "component/BackTop/BackTop";

const CardGrid = Card.Grid;

export default class componentName extends PureComponent {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    desc: PropTypes.string,
    sex: PropTypes.string.isRequired,
    blogNum: PropTypes.number,
    fans: PropTypes.array,
    follow: PropTypes.array,
    birthday: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  };

  render() {
    // console.log(this.props);
    const {
      avatar,
      nickname,
      sex,
      desc,
      follow,
      fans,
      blogNum,
      birthday
    } = this.props;
    return (
      <Layout className="me-box">
        <Card
          type="inner"
          className="main-card"
          bodyStyle={{ minWidth: "100%" }}
        >
          <Avatar icon={avatar} size="large" />
          <div style={{ width: "100%", textAlign: "center" }}>
            <span className="nickname">{nickname}</span>
            <Icon className="sex" type={sex} />
          </div>
          <p>{desc ? desc : "这个人很懒，没写简介"}</p>
        </Card>
        <Row gutter={16} style={{ marginTop: "24px" }}>
          <Col span={7} className="left-list">
            <Card className="follow-plate">
              <CardGrid>
                <strong>{follow.length}</strong>
                <span>关注</span>
              </CardGrid>
              <CardGrid>
                <strong>{fans.length}</strong>
                <span>粉丝</span>
              </CardGrid>
              <CardGrid>
                <strong>{blogNum}</strong>
                <span>博客</span>
              </CardGrid>
            </Card>
            <Card className="to-userinfo">
              <p>
                生日：{
                  moment(birthday)
                    .format()
                    .split("T")[0]
                }
              </p>
              <Link to="/userinfo">修改个人简介?</Link>
            </Card>
          </Col>
          <Col span={17}>
            <BlogList />
          </Col>
        </Row>
        <BackTop />
      </Layout>
    );
  }
}
