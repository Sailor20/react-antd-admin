import {
  LOGOUT, LOGIN, UPDATE_PASSWORD,
  SHOW_LOGIN_LOADING, HIDE_LOGIN_LOADING,
  REQUEST_DATA, LOGIN_REQUEST,
  LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST,
  LOGOUT_SUCCESS, TOGGLE_ORDER_DETAIL,
  SHOWMODAL, HIDEMODAL, SWITCHISMOTION,
  UPDATESTATE, QUERYSUCCESS, QUERY,
  DELETE, MULTIDELETE, CREATE, UPDATE, } from '../types/user.js';

// 登录相关
export const showLoginLoading = (data) => {
  return { type: SHOW_LOGIN_LOADING, payload: data };
};
export const hideLoginLoading = (data) => {
  return { type: HIDE_LOGIN_LOADING, payload: data };
};
/**
 * 登录
 * @param payload 请求参数
 */
export const login = (payload) => ({ type: LOGIN, payload });

/**
 * 退出
 */
export const logout = () => ({ type: LOGOUT });

/**
 * 修改密码
 * @param payload 请求参数
 */
export const updatePassword = (payload) => ({ type: UPDATE_PASSWORD, payload });


export const loginRequest = (data) => {
  return { type: LOGIN_REQUEST, payload: data };
};
export const loginSuccess = (token, isAdmin, userName) => {
  localStorage.setItem('token', token);
  localStorage.setItem('isAdmin', isAdmin);
  localStorage.setItem('userName', userName);
  return { type: LOGIN_SUCCESS, payload: { token, isAdmin, userName } };
};
export const loginFailure = (data) => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('userName');
  return { type: LOGIN_FAILURE, payload: { status: data.status, msg: data.msg } };
};
export const logoutRequest = () => {
  return { type: LOGOUT_REQUEST };
};
export const logoutSuccess = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('isAdmin');
  localStorage.removeItem('userName');
  return { type: LOGOUT_SUCCESS };
};
export const requestData = (data) => {
  return { type: REQUEST_DATA, payload: data };
};

export const toggleOrderDetail = (data) => {
  return { type: TOGGLE_ORDER_DETAIL, payload: data };
};

// 用户相关
export const showModal = (data) => {
  return { type: SHOWMODAL, payload: data };
};
export const hideModal = (data) => {
  return { type: HIDEMODAL, payload: data };
};
export const switchIsMotion = (data) => {
  return { type: SWITCHISMOTION, payload: data };
};
export const updateState = (data) => {
  return { type: UPDATESTATE, payload: data };
};
export const query = (data) => {
  return { type: QUERY, payload: data };
};
export const querySuccess = (data) => {
  return { type: QUERYSUCCESS, payload: data };
};
export const remove = (data) => {
  return { type: DELETE, payload: data };
};
export const multiDelete = (data) => {
  return { type: MULTIDELETE, payload: data };
};
export const create = (data) => {
  return { type: CREATE, payload: data };
};
export const update = (data) => {
  return { type: UPDATE, payload: data };
};
