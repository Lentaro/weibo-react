import { fromJS } from "immutable";
import axios from "axios";

import { addNewBlog, errorMsg } from "reducer/user.redux";

// actions
// const SEND_BLOG_SUCCESS = "SEND_BLOG_SUCCESS";
// const AUTH_SUCCESS = "AUTH_SUCCESS";
// const ERROR_MSG = "ERROR_MSG";

// reducer
const initialState = {
  // 内容
  value: "",
  // 转发的来源
  source: "",
  // 被转发
  cited_num: "",
  cited:[],
  // 评论
  comment_num: "",
  comment:[],
  // 提及
  mentions: [],
  // 作者id
  author: "",
  avatar:"",
  id: "",
  like:"",
  nickname:""
};

export const blog = (state = fromJS(initialState), action) => {
  switch (action.type) {
    // case AUTH_SUCCESS:
    //   return state.mergeDeep(action.payload);
    default:
      return state;
  }
};
 
// action creator
export const sendBlog = params => {
  return async dispatch => {
    const res = await axios.post("/blog/sendblog", params);
    if (res.status === 200 && res.data.code === 0) {
      const data = res.data.data;
      // console.log(data)
      dispatch(addNewBlog(data));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  };
};

// const sendBlogSuccess = data => {
//   return { type: SEND_BLOG_SUCCESS, payload: data };
// };

// const authSuccess = data => {
//   return { type: AUTH_SUCCESS, payload: data };
// };

// const errorMsg = msg => {
//   // console.log(msg)
//   return { type: ERROR_MSG, payload: { blogMsg: msg } };
// };
