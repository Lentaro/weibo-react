import React, { PureComponent } from "react";
import { Icon } from "antd";

import "./BackTop.less";
//点击返回顶部

export default class BackTop extends PureComponent {
  // 渲染之后
  componentDidMount() {
    window.onscroll = () => {
      // 变量t就是滚动条滚动时，到顶部的距离
      const t = document.documentElement.scrollTop || document.body.scrollTop;
      const top_view = document.getElementById("top_view");
      if (!top_view) {
        return null;
      } else if (top_view !== null) {
        top_view.style.display = t >= 100 ? "block" : "none";
      }
    };
  }

  // 返回顶部
  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <span id="top_view" onClick={this.scrollToTop} className="back-top">
        <Icon type="to-top" className="to-top" />
      </span>
    );
  }
}
