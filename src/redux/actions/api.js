/**
 * @description api action
 * @author yq
 * @date 2017/9/8 下午4:34
 */
import {
  UPDATE, UPDATE_API_STATUS, CREATE, DELETE, QUERY_LIST,
  BATCH_DELETE, UPDATE_API_STATE,
} from '../types/api.js';

// 更新state
export const updateApiState = data => ({ type: UPDATE_API_STATE, payload: data });

// 查询列表
export const queryList = payload => ({ type: QUERY_LIST, payload });

// 删除
export const remove = (id, cb) => ({ type: DELETE, payload: id, cb });

// 批量删除
export const batchRemove = (ids, cb) => ({ type: BATCH_DELETE, payload: ids, cb });

// 新增
export const create = (data, cb) => ({ type: CREATE, payload: data, cb });

// 更新
export const update = (data, cb) => ({ type: UPDATE, payload: data, cb });

// 更新状态
export const updateStatus = (data, cb) => ({ type: UPDATE_API_STATUS, payload: data, cb });
