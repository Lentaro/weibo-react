import { fromJS } from "immutable";
import axios from "axios";

import { blogTimeLineSort } from "utils/utils";
import { errorMsg } from "./user.redux";

// actions
// const SEND_BLOG_SUCCESS = "SEND_BLOG_SUCCESS";
// const AUTH_SUCCESS = "AUTH_SUCCESS";
// const ERROR_MSG = "ERROR_MSG";
const PUSH_BLOG = "PUSH_BLOG";
const ADD_NEW_BLOG = "ADD_NEW_BLOG";
const CHANGE_BLOG_INFO = "CHANGE_BLOG_INFO";

// reducer
const initialState = {
  // 内容
  value: "",
  // 转发的来源
  source: "",
  // 被转发
  cited_num: "",
  cited: [],
  // 评论
  comment_num: "",
  comment: [],
  // 提及
  mentions: [],
  // 作者id
  author: "",
  avatar: "",
  id: "",
  like: [],
  nickname: "",
  blog: []
};

export const blog = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case PUSH_BLOG:
      return state.mergeDeep({ blog: action.payload });
    case ADD_NEW_BLOG:
      return state.mergeDeep({
        blog: state.get("blog").unshift(action.payload)
      });
    // case AUTH_SUCCESS:
    //   return state.mergeDeep(action.payload);
    default:
      return state;
  }
};

// action creator

// 在列表中添加最新的博客
const addNewBlog = blog => {
  // console.log(blog);
  return { type: ADD_NEW_BLOG, payload: blog };
};

const changeBlogInfo = blog => {
  return { type: CHANGE_BLOG_INFO };
};

export const sendBlog = params => {
  // console.log(params)
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

export const addLike = blogId => {
  return async dispatch => {
    console.log(blogId)
    const res = await axios.post("/blog/like", blogId);
    if (res.status === 200 && res.data.code === 0) {
      const data = res.data.data;
      // console.log(data)
      dispatch(addNewBlog(data));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  };
};

// 获得最近的blog
export const getNearBlog = () => {
  return async dispatch => {
    const res = await axios.post("/blog/nearblog");
    if (res.status === 200 && res.data.code === 0) {
      // const data = res.data.data;
      // dispatch(pushBlog({ blog: data }));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  };
};

const pushBlog = blog => {
  // console.log(blog);
  return { type: PUSH_BLOG, payload: blog };
};

// 获取已登录用户的博客
export const getUserBlog = params => {
  return async dispatch => {
    const res = await axios.get(`/blog/getuserblog?id=${params}`);
    if (res.status === 200 && res.data.code === 0) {
      let data = res.data.doc;
      // console.log(data)
      data = blogTimeLineSort(data);
      // console.log(...data)
      dispatch(pushBlog(data));
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
