import request from '@/utils/request'

const api = {
  deptInfo: '/system/dept',
  add: '/system/dept/add',
  pageList: '/system/dept/page',
  list: '/system/dept/list',
  deleteDept: '/system/dept/delete',
  updateDept: '/system/dept/update'
}
/**
 * 获取登录前需要展示的模块
 */

export const getDeptInfo = (params: any) => {
  return request({
    url: api.deptInfo,
    method: 'GET',
    params: params
  })
}
export const addDept = (params: any) => {
  return request({
    url: api.add,
    method: 'post',
    data: params
  })
}
export const getDeptList = (params: any) => {
  return request({
    url: api.list,
    method: 'get',
    params: params
  })
}
export const getDeptPageList = (params: any) => {
  return request({
    url: api.pageList,
    method: 'get',
    params: params
  })
}

export const deleteDept = (params: any) => {
  return request({
    url: api.deleteDept + `/${params.id}`,
    method: 'post'
  })
}
export const updateDept = (params: any) => {
  return request({
    url: api.updateDept,
    method: 'post',
    data: params
  })
}
