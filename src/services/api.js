/**
 * @description 接口管理服务类
 * @author yq
 * @date 2017/9/8 下午4:47
 */
import {
  queryApi, queryApis, createApi, updateApi, updateApiStatus, removeApi, batchRemoveApi,
} from '../config/api';
import HttpUtil from '../utils/httpUtil';

/**
 * 新建API
 * @param data
 * @returns {*}
 */
export const create = data => HttpUtil.send(Object.assign({
  encode: false,
  data,
}, createApi));

/**
 * 删除API delete是关键字，因此采用remove
 * @param id
 * @returns {*}
 */
export const remove = id => HttpUtil.send(Object.assign({
  encode: false,
  params: { id },
}, removeApi));

/**
 * 批量删除API
 * @param id
 * @returns {*}
 */
export const batchRemove = ids => HttpUtil.send(Object.assign({
  encode: false,
  data: { ids },
}, batchRemoveApi));

/**
 * 分页查询列表
 * @param {Object} query  url中？后的参数
 *        例如： {
 *          page: 1,
 *          pageSize: 10,
 *        }
 * @returns {*}
 */
export const queryList = query => HttpUtil.send(Object.assign({
  encode: false,
  query,
}, queryApis));

/**
 * 查询详情
 * @param id
 * @returns {*}
 */
export const queryDetail = id => HttpUtil.send(Object.assign({
  encode: false,
  params: { id },
}, queryApi));

/**
 * 修改API
 * @param data
 * @returns {*}
 */
export const update = data => HttpUtil.send(Object.assign({
  encode: false,
  params: { id: data.id },
  data,
}, updateApi));

/**
 * 修改API状态
 * @param data
 * @returns {*}
 */
export const updateStatus = data => HttpUtil.send(Object.assign({
  encode: false,
  data,
}, updateApiStatus));
