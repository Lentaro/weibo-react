import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import immutableTransform from "redux-persist-transform-immutable";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import QueueAnim from "rc-queue-anim";
// 引入reducer
import reducers from "reducer/reducer";
import Login from "container/Login/Login";
import Register from "container/Register/Register";
import AuthRoute from "container/AuthRoute/AuthRoute";
import Dashboard from "container/Dashboard/Dashboard";
import "./App.less";

// 使用redux-persist来自动化将redux保存到localStorage中
const persistConfig = {
  // 使用redux-persist-transform-immutable来保存immutable的redux
  transforms: [immutableTransform()],
  // 保存的key为
  key: "blog",
  // 保存方式，默认为localStorage for web and AsyncStorage for react-native
  storage,
  // 白名单，要保存的key
  whitelist: ["blog", "blogUserCache"]
};
// 按照设置的config白名单等对reducer进行管理
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  // 将持久化过的reducer注入
  // reudcers
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    //chrome监控redux的调试工具
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
const persistedStore = persistStore(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* 用来包裹ui调用localStorage中的数据并延迟更新 */}
        <PersistGate loading={null} persistor={persistedStore}>
          <BrowserRouter>
            <div className="app">
              <AuthRoute />
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route component={Dashboard} />
              </Switch>
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
