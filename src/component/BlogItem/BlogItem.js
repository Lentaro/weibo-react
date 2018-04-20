import React, { PureComponent } from "react";
import { Card, Icon, Avatar } from "antd";
import PropTypes from "prop-types";

import "./BlogItem.less";
import { blogTimeCount } from "@/utils/utils";

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
    create_time: PropTypes.number.isRequired
  };
  render() {
    // console.log(this.props);
    const {
      id,
      avatar,
      value,
      cited_num,
      comment_num,
      like,
      mentions,
      nickname,
      create_time,
      handleCite,
      handleComment,
      handleLike
    } = this.props;
    return (
      <Card
        className="blog-item"
        bodyStyle={{ padding: "12px" }}
        actions={[
          <span onClick={handleCite} >
            <Icon type="export"/> 
            <span className="num">{cited_num ? cited_num : "转发"}</span>
          </span>,
          <span onClick={handleComment} >
            <Icon type="message"/>
            <span className="num">{comment_num ? comment_num : "评论"}</span>
          </span>,
          <span onClick={()=>{handleLike(id)}} >
            <Icon type="like-o"/>
            <span className="num">{like.length ? like.length : "赞"}</span>
          </span>
        ]}
      >
        <Meta
          className="blog-title"
          avatar={<Avatar icon={avatar} />}
          title={nickname}
          description={blogTimeCount(create_time)}
        />
        <p className="content">{value}</p>
        {/* value={value} cited_num={cited_num} comment_num={comment_num} like={like} mentions={mentions} */}
      </Card>
    );
  }
}
