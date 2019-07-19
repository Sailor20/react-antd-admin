/**
 * @description 初始化工具类
 * @author yq
 * @date 2017/9/8 上午10:23
 */
import { setMenuFold } from '../redux/actions/menu';
import { loginSuccess } from '../redux/actions/user';

export const init = (store) => {
  // 刷新页面或者首次访问时，判断本地是否存在token
  const { token } = localStorage;
  const isAdmin = localStorage.isAdmin === 'true';

  if (token) {
    store.dispatch(loginSuccess(token, isAdmin, localStorage.userName));
  }
  if (localStorage.menuFold) {
    store.dispatch(setMenuFold(localStorage.menuFold === 'true'));
  }
};
