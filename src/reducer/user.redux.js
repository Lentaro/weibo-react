import { fromJS } from "immutable";
import moment from "moment";
import axios from "axios";

// action
const LOAD_DATA = "LOAD_DATA";
const ERROR_MSG = "ERROR_MSG";
const AUTH_SUCCESS = "AUTH_SUCCESS";
const CLEAN_MSG = "CLEAN_MSG";

// reducer
const initialState = {
  nickname: "",
  avatar: "",
  desc: "",
  sex: "",
  follow: [],
  fans: [],
  blog: [],
  birthday: moment("1980/1/1", "YYYY/MM/DD"),
  msg: ""
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
    default:
      return state;
  }
};

// action creator

const errorMsg = msg => {
  // console.log(msg)
  return { type: ERROR_MSG, payload: { msg } };
};

const authSuccess = data => {
  return { type: AUTH_SUCCESS, payload: data };
};

export const loadData = userData => {
  return { type: LOAD_DATA, payload: userData };
};

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

export const cleanMsg = () => {
  return { type: CLEAN_MSG, payload: { msg: "" } };
};
