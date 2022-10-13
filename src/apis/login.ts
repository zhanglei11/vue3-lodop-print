import request from '@/utils/request';
/**
 * 登录
 */
export const login = (params: any) => {
  return request({
    url: '/login',
    method: 'POST',
    data: params
  });
};
/**
 * 登录
 */
export const adlogin = (params: any) => {
  return request({
    url: '/login/ad',
    method: 'POST',
    data: params
  });
};
