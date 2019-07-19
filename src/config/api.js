/**
 * @description API接口
 * @author yq
 * @date 2017/9/8 下午4:51
 */

import {
  apiHost, docHost, ossHost, apiPrefix,
} from './index';

export { apiHost, docHost, ossHost };

// 用户中心
// 登录
export const loginApi = {
  method: 'post',
  path: `${apiPrefix}/users/login`,
};
// 修改密码
export const updatePasswordApi = {
  method: 'post',
  path: `${apiPrefix}/users/password/update`,
};
// 退出
export const logoutApi = {
  method: 'post',
  path: `${apiPrefix}/users/logout`,
};
// 获取用户拥有的菜单信息列表
export const queryUserMenusApi = {
  method: 'get',
  path: `${apiPrefix}/users/:id/menus`,
};
// 获取列表
export const queryUsersApi = {
  method: 'get',
  path: `${apiPrefix}/users`,
};
// 获取用户信息详情
export const queryUserApi = {
  method: 'get',
  path: `${apiPrefix}/users/:id`,
};
// 新增
export const createUserApi = {
  method: 'post',
  path: `${apiPrefix}/users`,
};
// 修改
export const updateUserApi = {
  method: 'patch',
  path: `${apiPrefix}/users/:id`,
};
// 删除API
export const removeUserApi = {
  method: 'delete',
  path: `${apiPrefix}/users/:id`,
};
// 批量删除API
export const batchRemoveUserApi = {
  method: 'delete',
  path: `${apiPrefix}/users`,
};

// 服务管理
// 重启服务
export const restartApiServerApi = {
  method: 'post',
  path: `${apiPrefix}/servers/api/restart`,
};
// 获取api重启日志
export const queryRestartApiLogListApi = {
  method: 'get',
  path: `${apiPrefix}/servers/logs/list`,
};

// thriftFile
// 获取thrift文件列表(含count)
export const queryThriftFileListApi = {
  method: 'get',
  path: `${apiPrefix}/thrifts/files/list`,
};
// 上传thrift文件
export const uploadThriftFileApi = {
  method: 'post',
  path: `${apiPrefix}/thrifts/files/upload`,
};

// thrift
// 获取thrift列表
export const queryThriftsApi = {
  method: 'get',
  path: `${apiPrefix}/thrifts`,
};
// 获取thrift列表(含count)
export const queryThriftListApi = {
  method: 'get',
  path: `${apiPrefix}/thrifts/list`,
};
// 获取thrift详情
export const queryThriftApi = {
  method: 'get',
  path: `${apiPrefix}/thrifts/:id`,
  pattern: `${apiPrefix}/thrifts/:id`,
};
// 新增thrift
export const createThriftApi = {
  method: 'post',
  path: `${apiPrefix}/thrifts`,
};
// 修改thrift
export const updateThriftApi = {
  method: 'patch',
  path: `${apiPrefix}/thrifts/:id`,
};
// 修改thrift状态
export const updateThriftStatusApi = {
  method: 'post',
  path: `${apiPrefix}/thrifts/status`,
};
// 删除thrift
export const removeThriftApi = {
  method: 'delete',
  path: `${apiPrefix}/thrifts/:id`,
};
// 批量删除thrift
export const batchRemoveThriftApi = {
  method: 'delete',
  path: `${apiPrefix}/thrifts`,
};

// api
// 获取API列表
export const queryApis = {
  method: 'get',
  path: `${apiPrefix}/apis/list`,
};
// 获取API详情
export const queryApi = {
  method: 'get',
  path: `${apiPrefix}/apis/:id`,
  pattern: `${apiPrefix}/apis/:id`,
};
// 新增API
export const createApi = {
  method: 'post',
  path: `${apiPrefix}/apis`,
};
// 修改API
export const updateApi = {
  method: 'patch',
  path: `${apiPrefix}/apis/:id`,
};
// 修改API状态
export const updateApiStatus = {
  method: 'post',
  path: `${apiPrefix}/apis/status`,
};
// 删除API
export const removeApi = {
  method: 'delete',
  path: `${apiPrefix}/apis/:id`,
};
// 批量删除API
export const batchRemoveApi = {
  method: 'delete',
  path: `${apiPrefix}/apis`,
};

// 菜单
// 获取菜单列表
export const queryMenusApi = {
  method: 'get',
  path: `${apiPrefix}/menus`,
};
// 获取菜单详情
export const queryMenuApi = {
  method: 'get',
  path: `${apiPrefix}/menus/:id`,
  pattern: `${apiPrefix}/menus/:id`,
};
// 新增菜单
export const createMenuApi = {
  method: 'post',
  path: `${apiPrefix}/menus`,
};
// 修改菜单
export const updateMenuApi = {
  method: 'patch',
  path: `${apiPrefix}/menus/:id`,
};
// 删除菜单
export const removeMenuApi = {
  method: 'delete',
  path: `${apiPrefix}/menus/:id`,
};
// 批量删除菜单
export const batchRemoveMenuApi = {
  method: 'delete',
  path: `${apiPrefix}/menus`,
};
