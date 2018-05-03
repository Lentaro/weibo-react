import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Mention } from "antd";

import SendBLog from "component/SendBlog/SendBlog";
import CiteList from "container/CiteList/CiteList";
import { connect } from "react-redux";
import { sendBlog } from "reducer/blog.redux";
import { update } from "reducer/user.redux";
import "./Cite.less";

const { toContentState } = Mention;
@connect(state => ({ user: state.user }), { sendBlog, update })
export default class Cite extends Component {
  static propTypes = {
    source: PropTypes.string,
    sourceValue: PropTypes.object,
    nickname: PropTypes.string.isRequired,
    citeValue: PropTypes.string.isRequired,
    sourceList: PropTypes.array
  };
  state = {
    sourceValue: this.props.sourceValue
      ? " @" +
        this.props.sourceValue.nickname +
        " :" +
        this.props.sourceValue.value
      : " @" + this.props.nickname + " :" + this.props.citeValue
  };
  render() {
    const {
      source,
      sourceValue,
      sourceList,
      citeValue,
      nickname,
      update,
      sendBlog
    } = this.props;
    const { blogNum } = this.props.user.toJS();
    // console.log(sourceList);
    let newSourceList = [];
    if (sourceList) {
      // console.log(2)
      newSourceList = Array.from(sourceList);
    }
    newSourceList.push(source);
    // console.log(source);
    // console.log(newSourceList)
    return (
      <Card className="cite" bodyStyle={{ padding: " 0 12px" }}>
        <Mention
          className="sourceValue"
          value={toContentState(this.state.sourceValue)}
          readOnly
        />
        <SendBLog
          sourceList={newSourceList}
          update={update}
          sendBlog={sendBlog}
          blogNum={blogNum}
          defaultValue={sourceValue ? "// @" + nickname + " :" + citeValue : ""}
          type="cite"
          buttonSize="small"
        />
        <CiteList type="cite" id={source} />
      </Card>
    );
  }
}
