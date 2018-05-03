import React, { PureComponent } from "react";
import { Card, Icon, Avatar } from "antd";
import PropTypes from "prop-types";

import "./BlogItem.less";
import { blogTimeCount } from "@/utils/utils";
import Comment from "container/Comment/Comment";
import Cite from "../../container/Cite/Cite";
import CiteSource from "component/CiteSource/CiteSource";

const { Meta } = Card;

export default class BlogItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    cited_num: PropTypes.number,
    comment_num: PropTypes.number,
    like: PropTypes.array,
    mentions: PropTypes.array,
    create_time: PropTypes.number.isRequired,
    handleLike: PropTypes.func.isRequired,
    userId: PropTypes.string,
    type: PropTypes.string.isRequired
  };
  state = {
    commentUnfold: false,
    citeUnfold: false
  };
  handleCite = () => {
    if (this.state.citeUnfold) {
      this.setState({
        citeUnfold: false
      });
    } else {
      this.setState({
        citeUnfold: true,
        commentUnfold: false
      });
    }
  };
  handleComment = () => {
    if (this.state.commentUnfold) {
      this.setState({
        commentUnfold: false
      });
    } else {
      this.setState({
        citeUnfold: false,
        commentUnfold: true
      });
    }
  };
  render() {
    // console.log(this.props);
    const {
      id,
      avatar,
      value,
      source,
      source_info,
      cited_num,
      comment_num,
      like,
      mentions,
      nickname,
      create_time,
      handleLike,
      type,
      userId
    } = this.props;
    // console.log(id);
    let likeNum = null;
    if (like) {
      likeNum = like.length;
    }
    // console.log(source_info)
    // console.log(userId);
    // console.log(like);
    return (
      <div className="blog-item-box">
        <Card
          className="blog-item"
          bodyStyle={{ padding: "12px" }}
          actions={[
            <span onClick={this.handleCite}>
              <Icon type="export" />
              <span className="num">{cited_num ? cited_num : "转发"}</span>
            </span>,
            <span onClick={this.handleComment}>
              <Icon type="message" />
              <span className="num">{comment_num ? comment_num : "评论"}</span>
            </span>,
            <span
              onClick={() => {
                handleLike(id);
              }}
            >
              <Icon
                type={
                  likeNum
                    ? like.filter(v => v === userId).length
                      ? "like"
                      : "like-o"
                    : "like-o"
                }
              />
              <span className="num">{likeNum ? likeNum : "赞"}</span>
            </span>
          ]}
        >
          <Meta
            className="blog-title"
            avatar={<Avatar icon={avatar} />}
            title={nickname}
            description={blogTimeCount(create_time)}
          />
          <pre className="content">{value}</pre>
          {type === "cite" ? (
            <CiteSource
              nickname={source_info.nickname}
              value={source_info.value}
              cited_num={source_info.cited_num}
              comment_num={source_info.comment_num}
              create_time={source_info.create_time}
              like={source_info.like}
              userId={userId}
            />
          ) : null}
          {/* value={value} cited_num={cited_num} comment_num={comment_num} like={like} mentions={mentions} */}
        </Card>
        {this.state.commentUnfold ? <Comment source={id} /> : null}
        {this.state.citeUnfold ? (
          <Cite
            sourceValue={source_info}
            citeValue={value}
            sourceList={source}
            source={id}
            nickname={nickname}
          />
        ) : null}
      </div>
    );
  }
}
