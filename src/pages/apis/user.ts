import request from '@/utils/request'

const api = {
  userInfo: '/system/user',
  getCurrentUser: '/system/user/currentUser',
  add: '/system/user/add',
  pageList: '/system/user/page',
  userList: '/system/user/list',
  deleteUser: '/system/user/delete',
  updateUser: '/system/user/update',
  authRole: '/system/user/authRole',
  resetPassword: '/system/user/resetPassword'
}
/**
 * 获取登录前需要展示的模块
 */

export const getUserInfo = (params: any) => {
  return request({
    url: api.userInfo + `/${params.userId}`,
    method: 'GET'
  })
}
/**
 * 获取当前登录用户信息
 */
export const getCurrentUser = () => {
  return request({
    url: api.getCurrentUser,
    method: 'GET'
  })
}

export const addUser = (params: any) => {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}
export const getUserList = (params: any) => {
  return request({
    url: api.pageList,
    method: 'get',
    params: params
  })
}
export const getUserListAll = (params: any) => {
  return request({
    url: api.userList,
    method: 'get',
    params: params
  })
}
export const deleteUser = (params: any) => {
  return request({
    url: api.deleteUser + `/${params.userId}`,
    method: 'post'
  })
}
export const updateUser = (params: any) => {
  return request({
    url: api.updateUser,
    method: 'post',
    data: params
  })
}
// 用户授权
export const authRole = (params: any) => {
  return request({
    url: api.authRole,
    method: 'post',
    data: params
  })
}
// 修改密码
export const resetPassword = (params: any) => {
  return request({
    url: api.resetPassword,
    method: 'post',
    data: params
  })
}
