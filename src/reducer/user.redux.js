import { fromJS } from "immutable";
import moment from "moment";
import axios from "axios";
import browserCookie from "browser-cookies";

import { redirectJud } from "utils/utils";

// action
const LOAD_DATA = "LOAD_DATA";
const ERROR_MSG = "ERROR_MSG";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const CLEAN_MSG = "CLEAN_MSG";
const LOGOUT = "LOGOUT";
const USER_INFO_UPDATE_SUCCESS = "USER_INFO_UPDATE_SUCCESS";
const ADD_BLOG_NUM = "ADD_BLOG_NUM";

// reducer
const initialState = {
  nickname: "",
  avatar: "",
  desc: "",
  sex: "",
  follow: [],
  fans: [],
  blogNum: 0,
  birthday: moment("1980/1/1", "YYYY/MM/DD"),
  msg: "",
  redirectTo: "",
  create_time: "",
  id: ""
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
    case ADD_BLOG_NUM:
      return state.update("blogNum", value => value + 1);
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
  // console.log(userData);
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

// 添加博客数
export const addBLogNum = () => {
  return { type: ADD_BLOG_NUM };
};

// http://localhost:9093"
