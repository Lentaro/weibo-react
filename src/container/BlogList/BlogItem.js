import React, { Component } from "react";
import { Card, Icon, Avatar } from "antd";
import PropTypes from "prop-types";

import "./BlogItem.less";
import { blogTimeCount } from "@/utils/utils";

const { Meta } = Card;

export default class BlogItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    cited_num: PropTypes.number,
    comment_num: PropTypes.number,
    like: PropTypes.number,
    mentions: PropTypes.array,
    create_time: PropTypes.number.isRequired
  };

  render() {
    // console.log(this.props);
    const {
      avatar,
      value,
      cited_num,
      comment_num,
      like,
      mentions,
      nickname,
      create_time
    } = this.props;
    return (
      <Card className="blog-item" bodyStyle={{ padding: "12px" }}>
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
