import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Avatar, Icon } from "antd";

import { blogTimeCount } from "@/utils/utils";
export default class CiteItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    like: PropTypes.array,
    mentions: PropTypes.array,
    create_time: PropTypes.number.isRequired,
    handleLike: PropTypes.func.isRequired
  };
  render() {
    // console.log(this.props.id);
    const {
      id,
      avatar,
      value,
      like,
      mentions,
      create_time,
      handleLike,
      nickname
    } = this.props;
    let likeNum = null;
    if (like) {
      likeNum = like.length;
    }
    return (
      <div className="comment-item">
        <Avatar className="avatar" icon={avatar} />
        <div className="comment-content">
          <div className="comment-text">
            <span className="nickname">{nickname}</span>
            <span className="colon">:</span>
            {value}
          </div>
          <div className="comment-con-bottom">
            <span className="create-time">{blogTimeCount(create_time)}</span>
            <span className="actions">
              <span
                className="zan"
                onClick={() => handleLike({ id, type: "cite" })}
              >
                <Icon type={likeNum ? "like" : "like-o"} />
                <span className="num">{likeNum ? likeNum : "赞"}</span>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
