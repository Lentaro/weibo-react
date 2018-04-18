import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";

import BlogItem from "./BlogItem";
import { getUserBlog } from "reducer/user.redux";

@connect(
  state => {
    return { user: state.user };
  },
  { getUserBlog }
)
export default class BlogList extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !is(nextProps.user, this.props.user);
  }
  
  componentDidUpdate() {
    // console.log(this.props.user.get("_id"));
    this.props.getUserBlog(this.props.user.get("_id"));
  }
  render() {
    // console.log(this.props);
    const { blog } = this.props.user.toJS();
    return blog.map(v => (
      <BlogItem
        nickname={v.nickname}
        id={v._id}
        create_time={v.create_time}
        avatar={v.avatar}
        value={v.value}
        cited_num={v.cited_num}
        comment_num={v.comment_num}
        like={v.like}
        mentions={v.mentions}
        key={v._id}
      />
    ));
  }
}
