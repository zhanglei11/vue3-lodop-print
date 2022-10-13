import request from '@/utils/request'

const api = {
  roleInfo: '/system/role',
  add: '/system/role/add',
  pageList: '/system/role/page',
  deleteRole: '/system/role/delete',
  updateRole: '/system/role/update',
  getUserRoleList: '/system/role/list/byUser'
}
/**
 * 获取登录前需要展示的模块
 */

export const getRoleInfo = (params: any) => {
  return request({
    url: api.roleInfo + `/${params.id}`,
    method: 'GET'
  })
}
export const addRole = (params: any) => {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}
export const getUserRoleList = (params: any) => {
  return request({
    url: api.getUserRoleList,
    method: 'get',
    params: params
  })
}
//
export const getRoleList = (params: any) => {
  return request({
    url: api.pageList,
    method: 'get',
    params: params
  })
}

export const deleteRole = (params: any) => {
  return request({
    url: api.deleteRole + `/${params.roleId}`,
    method: 'post'
  })
}
export const updateRole = (params: any) => {
  return request({
    url: api.updateRole,
    method: 'post',
    data: params
  })
}
