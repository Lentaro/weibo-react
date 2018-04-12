import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// 引入reducer
import reducers from "reducer/reducer";
import Login from "component/Login/Login";
import Register from "component/Register/Register";
import AuthRoute from "component/AuthRoute/AuthRoute";
import Dashboard from "component/Dashboard/Dashboard";
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
            <Route path="/" component={AuthRoute} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
