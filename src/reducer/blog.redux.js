import { fromJS, Map } from "immutable";
import axios from "axios";

import { errorMsg } from "./user.redux";

// actions
// const SEND_BLOG_SUCCESS = "SEND_BLOG_SUCCESS";
// const AUTH_SUCCESS = "AUTH_SUCCESS";
// const ERROR_MSG = "ERROR_MSG";
const PUSH_BLOG = "PUSH_BLOG";
const ADD_NEW_BLOG = "ADD_NEW_BLOG";
const UPDATE_BLOG_INFO = "UPDATE_BLOG_INFO";
const COMMENT_NUM_ADD = "COMMENT_NUM_ADD";
const PUSH_COMMENT = "PUSH_COMMENT";
const COMMENT_INFO_UPDATE = "COMMENT_INFO_UPDATE";
const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";

// reducer
const initialState = {
  // 内容
  value: "",
  // 转发的来源
  source: [],
  source_value: {},
  // 被转发
  cited_num: "",
  cited: [],
  // 评论
  comment_num: "",
  comment: {},
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
      // return state.mergeDeep({ blog: action.payload });
      return state.updateIn(["blog"], val => {
        return fromJS(action.payload);
      });
    case PUSH_COMMENT:
      return state.updateIn(["comment", action.payload.source], val => {
        return action.payload.data;
      });
    case ADD_NEW_BLOG:
      // console.log(action.payload)
      return state.mergeDeep({
        blog: state.get("blog").concat(action.payload)
      });
    case ADD_NEW_COMMENT:
      return state.updateIn(["comment", action.payload.source], val => {
        // console.log(val);
        // console.log(action.payload.data);
        if (!val) {
          val = [];
        }
        return [...val, action.payload.data];
      });
    // case AUTH_SUCCESS:
    //   return state.mergeDeep(action.payload);
    case UPDATE_BLOG_INFO:
      return state.update("blog", v =>
        state.get("blog").map(v => {
          const id = v._id ? v._id : v.get("_id");
          // console.log(id);
          if (id === action.payload._id) {
            // console.log(action.payload._id);
            return Map(action.payload);
          } else {
            return v;
          }
        })
      );
    case COMMENT_INFO_UPDATE:
      return state.updateIn(["comment", action.payload.source[0]], val => {
        // console.log(val);
        // console.log(action.payload);
        return val.map(v => {
          const id = v._id ? v._id : v.get("_id");
          // console.log(id);
          if (id === action.payload._id) {
            return action.payload;
          } else {
            return v;
          }
        });
      });
    default:
      return state;
  }
};

// action creator

const addNewComment = data => {
  // console.log(data.source);
  return { type: ADD_NEW_COMMENT, payload: data };
};

const pushComment = data => {
  // console.log(data);
  return { type: PUSH_COMMENT, payload: data };
};

export const getBlogComment = source => {
  return async dispatch => {
    const res = await axios.get(`/blog/getblogcomment?source=${source}`);
    if (res.status === 200 && res.data.code === 0) {
      const data = res.data.doc;
      // console.log(data);
      dispatch(pushComment({ source, data }));
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  };
};

// 在列表中添加最新的博客
const addNewBlog = blog => {
  // console.log(blog);
  return { type: ADD_NEW_BLOG, payload: blog };
};

const updateBlogInfo = blog => {
  return { type: UPDATE_BLOG_INFO, payload: blog };
};

export const commentNumAdd = source => {
  return { type: COMMENT_NUM_ADD, payload: source };
};

export const sendBlog = params => {
  // console.log(params);
  return async dispatch => {
    const res = await axios.post("/blog/sendblog", params);
    if (res.status === 200 && res.data.code === 0) {
      // console.log(res.data);
      // console.log(!!res.data.type);
      // const data = blogTypeFilter([res.data.data]);
      // console.log(data)
      // if (data.length) {
      //   dispatch(addNewBlog(...data));
      // }
      // console.log(res.data.source);
      // console.log(res.data.type);
      if (res.data.type === "comment") {
        // console.log(2);
        dispatch(
          addNewComment({ data: res.data.data, source: res.data.source._id })
        );
        dispatch(updateBlogInfo(res.data.source));
      } else {
        // console.log(1);
        // console.log(res.data.data);
        dispatch(addNewBlog(res.data.data));
      }
    } else {
      dispatch(errorMsg(res.data.msg));
    }
  };
};

const commentInfoUpdate = params => {
  // console.log(params);
  return { type: COMMENT_INFO_UPDATE, payload: params };
};

export const addLike = blogId => {
  return async dispatch => {
    const type = blogId["type"];
    if (blogId["type"] === "comment") {
      blogId = blogId["id"];
    }
    const res = await axios.post("/blog/like", { blogId });
    if (res.status === 200 && res.data.code === 0) {
      const { doc } = res.data;
      // console.log(doc.like);
      // console.log(doc);
      if (type === "comment") {
        dispatch(commentInfoUpdate(doc));
      } else {
        dispatch(updateBlogInfo(doc));
      }
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
      const data = res.data.doc;
      // console.log(data);
      // data = blogTimeLineSort(blogTypeFilter(data));
      // console.log(...data);
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
