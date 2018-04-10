import { fromJS, Map } from "immutable";
import moment from "moment";

// action
const LOAD_DATA = "LOAD_DATA";

// reducer
const initState = Map({
  username: "",
  nickname: "",
  avatar: "",
  desc: "",
  sex: "", 
  follow: [],
  fans: [],
  blog: [],
  birthday: moment("1980/1/1", "YYYY/MM/DD")
});

export const user = (state = fromJS(initState), action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {};
    default:
      return state;
  }
};

// action creator
