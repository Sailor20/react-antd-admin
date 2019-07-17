import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import freeze from 'redux-freeze';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import * as rootReducer from '../reducers/index';
import { createBrowserHistory as createHistory } from 'history';
import saga from '../sagas';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

// 1. 配置 middleware 中间件; 因 store已区分环境, 所以不需要在单独抽出 middleware 单独作为模块(避免二次判断环境)
const middleware = [
  routerMiddleware(history),  // router-redux配置 history
  // thunk,  // 异步
  sagaMiddleware,  // 异步
  freeze, // 如果 state在其他地方改变, 会跳出错误
  createLogger() // 调试日志
];

// 2. 配置 enhancer 增强器; 使用多个 store enhancer, 要使用 compose() 方法
const enhancer = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // 必须在 middleware 之后
);

// 3. 配置 combine: 组合 redux 与 router
const combine = combineReducers({
  ...rootReducer,
  // router: routerReducer
  router: connectRouter(history)
});

// 4. 配置 store; 判断 dev环境下浏览器是否配有 redux-devtools 工具
const configureStore = (initialState) => {
  let store;

  if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(
      combine,
      initialState,
      applyMiddleware(...middleware)
    );
  } else {
    store = createStore(
      combine,
      initialState,
      enhancer
    );
  }

  // 启动saga中间件
  sagaMiddleware.run(saga);

  return store;
};

export { configureStore, history };
