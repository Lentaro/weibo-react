import React, { Component } from "react";
import { connect } from "react-redux";
import { is } from "immutable";
import PropTypes from "prop-types";

import { blogTimeLineSort } from "utils/utils";
import { addLike, getBlogCite } from "reducer/blog.redux";
import CiteItem from "component/CiteItem/CiteItem";

@connect(
  state => ({
    citeList: state.blog.get("cite")
  }),
  {
    addLike,
    getBlogCite
  }
)
export default class CiteList extends Component {
  static propTypes = {
    id: PropTypes.string
  };
  componentDidMount() {
    // console.log(this.props.id)
    if (this.props.id) {
      this.props.getBlogCite(this.props.id);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      is(nextProps.id, this.props.id) &&
      is(nextProps.citeList, this.props.citeList)
    );
  }
  handleLike = id => {
    // console.log(id)
    this.props.addLike(id);
  };

  render() {
    // console.log(this.props.id);
    // console.log(this.props.citeList)
    const { id } = this.props;
    let cite = [];
    cite = blogTimeLineSort(this.props.citeList.toJS()[id]);
    // console.log(cite);
    return cite.map(v => (
      <CiteItem
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
