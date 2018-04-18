import { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loadData } from "reducer/user.redux";

@withRouter
@connect(null, { loadData })

// 验证信息用路由组件
export default class AuthRoute extends Component {
  componentDidMount() {
    const publicUrl = ["/login", "/register"];
    // console.log(this.props)
    const path = this.props.location.pathname;
    // 在publicUrl中寻找符合path的项，若找到第一个，返回其索引，若找不到返回-1
    if (publicUrl.indexOf(path) > -1) {
      return null;
    }
    (async () => {
      const res = await axios.get("/user/info");
      if (res.status === 200) {
        // console.log(res.data);
        if (res.data.code === 0) {
          // console.log(res.data)
          this.props.loadData(res.data.doc);
        } else {
          this.props.history.push("/login");
        }
      }
    })();
  }
  render() {
    return null;
  }
}

// const initialState = {
//   nickname: "",
//   avatar: "",
//   desc: "",
//   sex: "",
//   follow: [],
//   fans: [],
//   blog: [],
//   birthday: moment("1980/1/1", "YYYY/MM/DD"),
//   msg: "",
//   redirectTo: ""
// };
