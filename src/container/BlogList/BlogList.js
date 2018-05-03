import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";
import PropTypes from "prop-types";

import BlogItem from "component/BlogItem/BlogItem";
import { blogTimeLineSort, blogTypeFilter } from "utils/utils";
import { getUserBlog, addLike } from "reducer/blog.redux";
@connect(
  state => ({
    userId: state.user.get("id"),
    blogList: state.blog.get("blog"),
    commentList: state.blog.get("comment")
  }),
  {
    getUserBlog,
    addLike
  }
)
export default class BlogList extends Component {
  static propTypes = {
    id: PropTypes.string
  };
  componentDidMount() {
    // console.log(this.props.id);
    // console.log(1);
    if (this.props.id) {
      this.props.getUserBlog(this.props.id);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(3);
    // console.log(this.props.id);
    // console.log(nextProps.id);
    // console.log(is(nextProps.id, this.props.id) &&
    // is(nextProps.blogList, this.props.blogList));
    // console.log(nextProps.id, this.props.id)
    // console.log(is(nextProps.id,this.props.id))
    // if(this.props.type==="comment"){
    //   is(nextProps.id, this.props.id) &&
    // is(nextProps.commentList, this.props.commentList)
    // }
    // console.log(
    //   !(
    //     is(nextProps.id, this.props.id) &&
    //     is(nextProps.blogList, this.props.blogList)
    //   )
    // );
    return !(
      is(nextProps.id, this.props.id) &&
      is(nextProps.blogList, this.props.blogList)
    );
  }
  componentDidUpdate() {
    // console.log(this.props.id);
    // console.log(2)
    // console.log(this.props.id);
    // console.log(this.props.blogList.size===0);
    if (this.props.id) {
      this.props.getUserBlog(this.props.id);
    }
  }
  handleLike = id => {
    // console.log(id);
    // console.log(1);
    this.props.addLike(id);
  };
  render() {
    // console.log(this.props.blogList.toJS());
    // console.log(this.props.id);
    // const { type, id } = this.props;
    // console.log(id);
    // console.log(type);
    // console.log(this.props.blogList);
    const { userId } = this.props;
    let blog = [];
    blog = blogTimeLineSort(blogTypeFilter(this.props.blogList.toJS()));
    // console.log(blog);
    return blog.map(v => (
      <BlogItem
        userId={userId}
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
        type={v.type}
        source={v.source}
        source_info={v.source_info}
        handleCite={this.handleCite}
        handleComment={this.handleComment}
        handleLike={this.handleLike}
      />
    ));
  }
}
