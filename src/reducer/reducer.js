import { combineReducers } from "redux";
import { user } from "./user.redux";
import { blog } from "./blog.redux";
import { component } from "./component.redux";

export default combineReducers({ user, blog, component });
