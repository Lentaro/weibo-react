import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// 引入reducer
import reducers from "reducer/reducer";
import Login from "container/Login/Login";
import Register from "container/Register/Register";
import AuthRoute from "container/AuthRoute/AuthRoute";
import Dashboard from "container/Dashboard/Dashboard";
import BackTop from "component/BackTop/BackTop";
import "./App.less";

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    //chrome监控redux的调试工具
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app">
            <AuthRoute />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route component={Dashboard} />
            </Switch>
            <BackTop />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
