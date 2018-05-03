import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

import { blogTimeCount } from "@/utils/utils";
import "./CiteSource.less";

export default class CiteSource extends PureComponent {
  static propTypes = {
    nickname: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    cited_num: PropTypes.number,
    comment_num: PropTypes.number,
    create_time: PropTypes.number.isRequired,
    like: PropTypes.array,
    userId: PropTypes.string
  };

  render() {
    // console.log(this.props.value);
    const {
      nickname,
      value,
      cited_num,
      comment_num,
      create_time,
      like,
      userId
    } = this.props;
    return (
      <div className="cite-source-box">
        <div className="author-info">
          <span className="author-nickname">{"@" + nickname}</span>
        </div>
        <pre className="cite-source-content">{value}</pre>
        <div className="blog-info">
          <span className="create-time">{blogTimeCount(create_time)}</span>
          <span className="action">
            <span className="cite actions">
              <Icon type="export" />
              <span className="num">{cited_num ? cited_num : "转发"}</span>
            </span>
            <span className="comment actions">
              <Icon type="message" />
              <span className="num">{comment_num ? comment_num : "评论"}</span>
            </span>
            <span className="like actions">
              <Icon
                type={like.filter(v => v === userId).length ? "like" : "like-o"}
              />
              <span className="num">
                {like.filter(v => 1) ? like.length : "赞"}
              </span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}
