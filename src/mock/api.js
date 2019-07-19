/**
 * @description api mock接口
 * @author      yq
 * @date        2017-10-10 12:20:16
 */

import Mock from 'mockjs';
import {
  queryApis, createApi, updateApi, removeApi, batchRemoveApi, updateApiStatus,
} from '../config/api';

const listData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      'method|1': ['get', 'post', 'delete', 'patch', 'put'],
      path: /^(\/[a-z]+)+$/,
      'role|0-1': 1,
      thriftName: 'user',
      'serviceName|1': ['com.dlhr.zhiliao.thrift.service.TUserService',
        'com.dlhr.zhiliao.thrift.service.TWechatService'],
      actionName: /^[a-zA-Z]+$/,
      'status|1': [1, -1],
      updateTime: '@datetime',
      createTime: '@datetime',
    },
  ],
});


let database = listData.data;

const NOTFOUND = {
  code: 404,
  msg: '接口不存在',
};

export default () => {
  // Mock
  // 查询列表
  Mock.mock(new RegExp(queryApis.path), queryApis.method, (options) => {
    console.log('API list 接口-----', options);
    let query = {};
    if (options.query) {
      try {
        query = JSON.parse(options.query);
      } catch (err) {
        console.error('parse query err', err);
        query = {};
      }
    }
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    let newData = database;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            if (key === 'status') {
              return item.status.toString() === other[key];
            } if (key === 'keyword') {
              return other[key].every(iitem => item[key].indexOf(iitem) > -1);
            } if (key === 'startTime') {
              const start = new Date(other[key][0]).getTime();
              const end = new Date(other[key][1]).getTime();
              const now = new Date(item[key]).getTime();

              if (start && end) {
                return now >= start && now <= end;
              }
              return true;
            }
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1;
          }
          return true;
        });
      }
    }

    return ({
      code: 0,
      data: {
        list: newData.slice((page - 1) * pageSize, page * pageSize),
        total: newData.length,
      },
    });
  });
  // 启停用
  Mock.mock(new RegExp(updateApiStatus.path), updateApiStatus.method, (options) => {
    console.log('启停用-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const { id, status } = body;
    const editItem = {
      id,
      status,
      updateTime: Mock.mock('@now'),
    };
    let isExist = false;
    database = database.map((item) => {
      if (item.id === id) {
        isExist = true;
        return Object.assign(item, editItem);
      }
      return item;
    });

    if (!isExist) {
      return NOTFOUND;
    }
    return ({
      code: 0,
      msg: '操作成功',
    });
  });

  // 修改api
  const updateApiPattern = new RegExp(updateApi.path.replace(':id', '\\d*'));
  Mock.mock(updateApiPattern, updateApi.method, (options) => {
    console.log('api 修改接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const {
      name, path, method, role, thriftName, serviceName, actionName,
    } = body;
    // const { id } = req.params;
    const editItem = {
      name, path, method, role, thriftName, serviceName, actionName,
    };
    const id = options.url.match('[0-9]+$')[0];
    let isExist = false;
    let repeatData;
    database = database.map((item) => {
      if (item.id === id) {
        isExist = true;
        return Object.assign({}, item, editItem);
      }
      if (item.id !== id && item.path === path && item.method === method) {
        repeatData = item;
      }
      return item;
    });

    if (!isExist) {
      return NOTFOUND;
    }
    if (repeatData) {
      return {
        code: 1001,
        msg: `与已有接口(${item.method.toUpperCase()} ${item.path})重复`,
        data: repeatData,
      };
    }
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
  // 增加api
  Mock.mock(new RegExp(createApi.path), createApi.method, (options) => {
    console.log('api 新增接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const newData = body;
    const oldApi = database.find(item => (item.path === newData.path) && (item.method === newData.method));
    if (oldApi) {
      return {
        code: 101,
        msg: `接口(${item.method.toUpperCase()} ${item.path})已存在`,
        data: oldApi,
      };
    }
    newData.updateTime = Mock.mock('@now');
    newData.createTime = Mock.mock('@now');
    newData.id = Mock.mock('@id');
    database.unshift(newData);
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
  // 删除api
  const removeApiPattern = new RegExp(removeApi.path.replace(':id', '\\d*'));
  Mock.mock(removeApiPattern, removeApi.method, (options) => {
    console.log('api 删除接口-----', options);
    const id = options.url.match('[0-9]+$')[0];
    database = database.filter(item => item.id !== id);
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
  // 批量删除api
  Mock.mock(new RegExp(batchRemoveApi.path), batchRemoveApi.method, (options) => {
    console.log('api 批量删除接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const { ids } = body;
    database = database.filter(item => !ids.includes(item.id));
    return ({
      code: 0,
      msg: '操作成功',
    });
  });
};
