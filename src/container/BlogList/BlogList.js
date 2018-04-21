import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";

import BlogItem from "component/BlogItem/BlogItem";
import { getUserBlog, addLike } from "reducer/blog.redux";

@connect(
  state => ({ userId: state.user.get("id"), blogList: state.blog.get("blog") }),
  {
    getUserBlog,
    addLike
  }
)
export default class BlogList extends Component {
  componentDidMount() {
    // console.log(this.props.userId);
    // console.log(1)
    if (!!this.props.userId) {
      this.props.getUserBlog(this.props.userId);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps.userId, this.props.userId)
    // console.log(is(nextProps.userId,this.props.userId))
    return !(
      is(nextProps.userId, this.props.userId) &&
      is(nextProps.blogList, this.props.blogList)
    );
  }
  componentDidUpdate() {
    // console.log(2)
    // console.log(this.props.userId);
    // console.log(this.props.blogList.size===0);
    if (this.props.blogList.size === 0) {
      this.props.getUserBlog(this.props.userId);
    }
  }
  handleCite = () => {};
  handleComment = () => {};
  handleLike = id => {
    // console.log(id);
    // console.log(1);
    this.props.addLike(id);
  };
  render() {
    // console.log(this.props.blogList.toJS());
    const blog = this.props.blogList.toJS();
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
        handleCite={this.handleCite}
        handleComment={this.handleComment}
        handleLike={this.handleLike}
      />
    ));
  }
}
