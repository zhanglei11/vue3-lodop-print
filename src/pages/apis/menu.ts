import request from '@/utils/request'
const api = {
  menuInfo: '/system/menu',
  add: '/system/menu/add',
  pageList: '/system/menu/page',
  listByUser: '/system/menu/list/authorized/byUser', //获取用户已授权的菜单列表
  listByRole: '/system/menu/menuIds/authorized/byRole', //获取角色已授权的菜单ID列表
  listAll: '/system/menu/list',
  deleteMenu: '/system/menu/delete',
  updateMenu: '/system/menu/update'
}
/**
 * 获取登录前需要展示的模块
 */

export const getMenuInfo = (params: any) => {
  return request({
    url: api.menuInfo,
    method: 'GET',
    params: params
  })
}
export const addMenu = (params: any) => {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}
export const getMenuList = (params: any) => {
  return request({
    url: api.pageList,
    method: 'get',
    params: params
  })
}
export const getMenuListByUser = (params: any) => {
  return request({
    url: api.listByUser,
    method: 'get',
    params: params
  })
}

export const getMenuListByRole = (params: any) => {
  return request({
    url: api.listByRole,
    method: 'get',
    params: params
  })
}

export const menuPageList = (params: any) => {
  return request({
    url: api.pageList,
    method: 'get',
    params: params
  })
}

export const deleteMenu = (params: any) => {
  return request({
    url: api.deleteMenu + `/${params.id}`,
    method: 'post'
  })
}
export const updateMenu = (params: any) => {
  return request({
    url: api.updateMenu,
    method: 'post',
    data: params
  })
}
