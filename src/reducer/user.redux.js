import { fromJS } from "immutable";
import moment from "moment";
import axios from "axios";
import browserCookie from "browser-cookies";

import { redirectJud, blogTimeLineSort } from "utils/utils";

// action
const LOAD_DATA = "LOAD_DATA";
const ERROR_MSG = "ERROR_MSG";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const CLEAN_MSG = "CLEAN_MSG";
const LOGOUT = "LOGOUT";
const USER_INFO_UPDATE_SUCCESS = "USER_INFO_UPDATE_SUCCESS";
const PUSH_BLOG = "PUSH_BLOG";
const ADD_NEW_BLOG = "ADD_NEW_BLOG";
const ADD_BLOG_NUM = "ADD_BLOG_NUM";

// reducer
const initialState = {
  nickname: "",
  avatar: "",
  desc: "",
  sex: "",
  follow: [],
  fans: [],
  blog: [],
  blogNum: 0,
  birthday: moment("1980/1/1", "YYYY/MM/DD"),
  msg: "",
  redirectTo: ""
};

export const user = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case LOAD_DATA:
      return state.mergeDeep(action.payload);
    case AUTH_SUCCESS:
      return state.mergeDeep(action.payload);
    case ERROR_MSG:
      return state.mergeDeep(action.payload);
    case CLEAN_MSG:
      return state.mergeDeep(action.payload);
    case USER_INFO_UPDATE_SUCCESS:
      return state.mergeDeep(action.payload);
    case LOGOUT:
      return state.mergeDeep(action.payload);
    case PUSH_BLOG:
      return state.mergeDeep({blog:action.payload});
    case ADD_BLOG_NUM:
      return state.update("blogNum", value => value + 1);
    case ADD_NEW_BLOG:
      return state.mergeDeep({
        blog: state.get("blog").unshift(action.payload)
      });
    default:
      return state;
  }
};

// action creator

// 更新用户信息
export const update = values => {
  return async dispatch => {
    const res = await axios.post("/user/update", values);
    if (res.status === 200 && res.data.code === 0) {
      dispatch(userInfoUpdateSuccess(res.data.data));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  };
};

// 用户信息更新成功
const userInfoUpdateSuccess = data => {
  return { type: USER_INFO_UPDATE_SUCCESS, payload: data };
};

// 退出登录
export const logout = () => {
  browserCookie.erase("userid");
  return { type: LOGOUT, payload: { ...initialState, redirectTo: "/login" } };
};

// 出现错误信息
export const errorMsg = msg => {
  // console.log(msg)
  return { type: ERROR_MSG, payload: { msg } };
};

// 验证成功
const authSuccess = data => {
  data = { ...data, redirectTo: redirectJud(data) };
  return { type: AUTH_SUCCESS, payload: data };
};

// 获取数据
export const loadData = userData => {
  return { type: LOAD_DATA, payload: userData };
};

// 登陆
export const login = ({ username, password }) => {
  return async dispatch => {
    // console.log(username,password)
    const res = await axios.post("/user/login", { username, password });
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  };
};

// 注册
export const register = ({ username, password, nickname }) => {
  return async dispatch => {
    const res = await axios.post("/user/register", {
      username,
      password,
      nickname
    });
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  };
};

// 清除报错信息和跳转信息
export const cleanMsg = () => {
  return { type: CLEAN_MSG, payload: { msg: "", redirectTo: "" } };
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

// 在列表中添加最新的博客
export const addNewBlog = blog => {
  // console.log(blog);
  return { type: ADD_NEW_BLOG, payload: blog };
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

// 添加博客数
export const addBLogNum = () => {
  return { type: ADD_BLOG_NUM };
};

