import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";

import BlogItem from "component/BlogItem/BlogItem";
import { getUserBlog, addLike } from "reducer/blog.redux";

@connect(state => ({ blogList: state.blog.get("blog") }), {
  getUserBlog,
  addLike
})
export default class BlogList extends Component {
  componentDidMount() {
    this.props.getUserBlog(this.props.getWhoBlog);
    // console.log(this.props.getWhoBlog)
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps.getWhoBlog, this.props.getWhoBlog);
    // console.log(nextProps.blogList, this.props.blogList);
    // console.log(is(nextProps.getWhoBlog, this.props.getWhoBlog));
    // console.log(is(nextProps.blogList, this.props.blogList));
    return !(
      is(nextProps.getWhoBlog, this.props.getWhoBlog) &&
      is(nextProps.blogList, this.props.blogList)
    );
  }
  componentDidUpdate() {
    //   console.log(this.props.getWhoBlog);
    //   console.log(this.props.userId);
    this.props.getUserBlog(this.props.getWhoBlog);
  }
  handleCite = () => {};
  handleComment = () => {};
  handleLike = id => {
    console.log(id);
    console.log(1);
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
