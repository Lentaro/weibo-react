import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "antd";

import "./AvatarSelect.less";

export default class AvatarSelect extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   const value = this.props.value || {};
  //   this.
  // }
  state = {
    avatar: this.props.value || {}
  };
  static propTypes = {
    avatar:PropTypes.number
  };
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      const value = nextProps.value;
      this.setState({
        avatar: value
      });
    }
  }
  handleChange = v => {
    // console.log(v)
    this.setState({
      avatar: v
    });
    this.props.onChange(v);
  };
  render() {
    const CardGrid = Card.Grid;
    const list = ["aliwangwang", "apple", "coffee", "github"];
    return (
      <div>
        <Card className="avatar-select">
          {list.map(v => (
            <CardGrid
              key={v}
              className="select-item"
              onClick={() => this.handleChange(v)}
            >
              <Icon type={v} className="avatar" />
            </CardGrid>
          ))}
          当前头像为：<CardGrid className="show-item">
            <Icon className="avatar" type={this.state.avatar} />
          </CardGrid>
        </Card>
      </div>
    );
  }
}
