/**
 * @description http请求组件
 * @author yq
 * @date 2017/6/8 下午12:53
 */
import axios from 'axios';
import { apiHost, platform, version } from '../config';
import { removeToken, getToken } from './auth';

// 设置默认参数
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common.Authorization = getToken() || '';
// 以下代码为临时代码
axios.defaults.baseURL = localStorage.apiHost || apiHost;
axios.defaults.timeout = 30000;
// axios.defaults.withCredentials = false;
// Add a request interceptor
// axios.interceptors.request.use((config) => {
//   // Do something before request is sent
//   console.log('请求参数-----', config);
//   return config;
// }, (error) => {
//   // Do something with request error
//   return Promise.reject(error);
// });

// Add a response interceptor
axios.interceptors.response.use((response) => {
  console.log('响应参数-----', response);
  // Do something with response data
  if (response.status === 401 || (response.data && response.data.code === 401)) {
    // TOKEN失效
    removeToken();
    // 3秒后跳转到登录页面
    setTimeout(() => {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`;
    }, 3000);
    // 以下代码供跳转慢时的弹窗提示
    return Promise.reject({
      code: 401,
      msg: '登录身份过期, 3秒后将跳转至登录页面',
    });
  }
  // code不为零时，以错误形式返回
  if (!response.data || response.data.code !== 0) {
    return Promise.reject(response.data);
  }
  return response;
}, error =>
  // Do something with response error
  Promise.reject(error));

const HTTPERROR = {
  code: 500,
  msg: '请求失败，请稍后再试',
};
class HttpUtil {
  /**
   * http请求参数格式化方法
   * HttpUtil.formatParams({
   *    uid: 1101
   * })
   * @param opts 需要处理的json对象，例如： { uid: 1101 }
   * @param {Boolean}  deepEncode 深度encode,特殊情况下，如请求参数中包含富文本时，须深度encode
   * @returns {String}
   */
  static formatParams(opts, deepEncode) {
    if (!opts || typeof opts !== 'object') {
      throw new Error('请求参数不正确');
    }
    return deepEncode ? encodeURIComponent(encodeURIComponent(JSON.stringify(opts)))
      : encodeURIComponent(JSON.stringify(opts));
  }

  /**
   * http请求通用方法 调用方法
   * // get请求实例
   * HttpUtil.send({
   *    method: 'get'
   *    url: 'http://api.test.hrzan.com:55000/j2/fa/family/find/type,
   *    query: {
   *      token: 'bc77df1ee3f59670fbee79cfa344efc1',
   *      uid: 10423
   *    }
   * })
   * // post请求实例
   * HttpUtil.send({
   *    method: 'post'
   *    url: 'http://api.test.hrzan.com:55000/j2/fa/family/find/type,
   *    data: {
   *      token: 'bc77df1ee3f59670fbee79cfa344efc1',
   *      uid: 10423
   *    }
   * })
   * // 路径中有参数的请求, params中的key必须和路径总保持一致
   * HttpUtil.send({
   *    method: 'post'
   *    url: 'http://api.test.hrzan.com:55000/j2/user/:userId,
   *    params: {
   *      userId: 10423
   *    },
   *    data: {
   *      token: 'bc77df1ee3f59670fbee79cfa344efc1',
   *      uid: 10423
   *    }
   * })
   *  // post 图片上传
   * HttpUtil.send({
   *    headers = {
   *      'Content-Type': 'multipart/form-data'
   *    },
   *    method: 'post',
   *    encode: false,
   *    url: 'http://api.test.hrzan.com:55000/p/common/uploadImage,
   *    data: formData(文件表单数据)
   * })
   * @param opts
   * @-- {Boolean}  opts.deepEncode 深度encode，特殊情况下，如请求参数中包含富文本时，须深度encode
   * @-- {Boolean}  opts.encode 参数是否进行encode
   * @-- {String}  opts.method 请求方法
   * @-- {String}  opts.url 请求url
   * @-- {String}  opts.data 请求数据,body中的参数
   * @-- {String}  opts.query 请求数据,query中的参数
   * @returns {*}
   */
  static send(opts) {
    console.log('-------------开始请求', opts);
    if (!opts) {
      throw new Error('请求参数不正确');
    }
    if (!opts.method
      || !['get', 'post', 'delete', 'patch', 'put'].includes(opts.method)) {
      throw new Error('请求方式不正确');
    }
    opts.url = opts.path || opts.url;
    if (!opts.url) {
      throw new Error('请求路径不能为空');
    }
    if (opts.method === 'get') {
      opts.query = Object.assign({}, opts.query, {
        platform,
        version,
      });
    } else if (!opts.headers || opts.headers['Content-Type'] !== 'multipart/form-data') {
      opts.data = Object.assign({}, opts.data, {
        platform,
        version,
      });
    }
    // 请求配置
    const sendOpts = {
      method: opts.method,
      url: opts.url,
      timeout: opts.timeout || 30000,
    };
    if (opts.responseType) {
      sendOpts.responseType = opts.responseType;
    }
    if (opts.headers) {
      sendOpts.headers = opts.headers;
    }
    if (opts.onUploadProgress) {
      sendOpts.onUploadProgress = opts.onUploadProgress;
    }
    // params参数处理
    if (opts.params) {
      Object.keys(opts.params)
        .forEach(key => sendOpts.url = sendOpts.url.replace(`:${key}`, opts.params[key]));
    }
    // 是否转码，默认为true
    opts.encode = typeof opts.encode === 'boolean' ? opts.encode : true;
    if (opts.encode) {
      // url参数，如get请求中/n/qrcode?json=encodeURIComponent(JSON.stringify({ uid: 1101 }))中，query为 { uid: 1101 }
      if (opts.query) {
        sendOpts.url = sendOpts.url.indexOf('?') === -1
          ? `${sendOpts.url}?json=${HttpUtil.formatParams(opts.query)}`
          : `${sendOpts.url}&json=${HttpUtil.formatParams(opts.query)}`;
      }
      if (opts.data) {
        sendOpts.data = `${encodeURIComponent('json')}=${HttpUtil.formatParams(opts.data, opts.deepEncode)}`;
      }
    } else {
      if (opts.query) {
        const queryStr = Object.keys(opts.query)
          .map(key => `${key}=${opts.query[key]}`)
          .join('&');
        sendOpts.url = sendOpts.url.indexOf('?') === -1
          ? `${sendOpts.url}?${queryStr}`
          : `${sendOpts.url}&${queryStr}`;
      }
      if (opts.data) {
        sendOpts.data = opts.data;
      }
    }

    console.log('\n\n\nsenOpts------', sendOpts);

    return axios(sendOpts)
      .then(result => result.data)
      .catch((error) => {
        if (error && error.code) {
          return Promise.reject(Object.assign(error, {
            code: error.code || HTTPERROR.code,
            msg: error.msg || HTTPERROR.msg,
          }));
        }
        // 可在此处做通用错误处理
        const errorInfo = Object.assign({ error }, HTTPERROR);
        const errMsg = error.message || '';
        if (errMsg.indexOf('Network Error') !== -1) {
          // 网络错误
          errorInfo.msg = '网路存在异常，请检查网路后再试';
        } else if (errMsg.indexOf('timeout') !== -1) {
          // 请求超时
          errorInfo.msg = '请求超时，请稍后再试';
        } else {
          // 其它
          errorInfo.msg = '请求失败，请稍后再试';
        }
        return Promise.reject(errorInfo);
      });
  }
}

export default HttpUtil;
