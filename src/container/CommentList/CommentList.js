import React, { Component } from "react";
import { connect } from "react-redux";
import { is, fromJS } from "immutable";
import PropTypes from "prop-types";

import { blogTimeLineSort } from "utils/utils";
import { addLike, getBlogComment } from "reducer/blog.redux";
import CommentItem from "component/CommentItem/CommentItem";
@connect(
  state => ({
    commentList: state.blog.get("comment")
  }),
  {
    addLike,
    getBlogComment
  }
)
export default class CommentList extends Component {
  static propTypes = {
    id: PropTypes.string
  };
  componentDidMount() {
    // console.log(this.props.id);
    // console.log(1);
    if (this.props.id) {
      this.props.getBlogComment(this.props.id);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.props.id);
    // console.log(nextProps.id);
    // console.log(is(nextProps.id, this.props.id) &&
    // is(nextProps.commentList, this.props.commentList));
    // console.log(nextProps.id, this.props.id)
    // console.log(is(nextProps.id,this.props.id))
    return !(
      is(nextProps.id, this.props.id) &&
      is(nextProps.commentList, this.props.commentList)
    );
  }
  componentDidUpdate() {
    // console.log(1);
    // console.log(2)
    // console.log(this.props.id);
    // console.log(this.props.commentList.size===0);
    // if (this.props.commentList.size === 0) {
    //   this.props.getUserBlog(this.props.id);
    // }
    // this.props.getBlogComment(this.props.id);
  }
  handleCite = () => {};
  handleComment = () => {};
  handleLike = id => {
    // console.log(id);
    // console.log(1);
    this.props.addLike(id);
  };
  render() {
    // console.log(this.props.commentList.toJS());
    // console.log(this.props.id);
    const { id } = this.props;
    // console.log(id);
    // console.log(type);
    // console.log(this.props.commentList);
    let blog = [];
    // console.log(this.props.commentList.toJS()[id]);
    blog = blogTimeLineSort(this.props.commentList.toJS()[id]);
    // console.log(blog);

    // console.log(blog);
    return blog.map(v => (
      <CommentItem
        key={v._id}
        id={v._id}
        avatar={v.avatar}
        value={v.value}
        like={v.like}
        mentions={v.mentions}
        handleLike={this.handleLike}
        create_time={v.create_time}
        nickname={v.nickname}
      />
    ));
  }
}
