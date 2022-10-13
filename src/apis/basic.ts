import request from '@/utils/request'
/**
 * 工序
 * 新建
 */
export const procedureCreate = (params: any) => {
  return request({
    url: '/rest/procedure/create',
    method: 'POST',
    data: params
  })
}
/**
 * 工序
 * 删除
 */
export const procedureDelete = (params: any) => {
  return request({
    url: `/rest/procedure/delete/${params.workingProcedureId}`,
    method: 'POST',
    data: params
  })
}
/**
 * 工序
 * 列表查询
 */
export const procedureList = (params: any) => {
  return request({
    url: '/rest/procedure/list',
    method: 'POST',
    data: params
  })
}
/**
 * 工序
 * 分页查询
 */
export const procedurePage = (params: any) => {
  return request({
    url: '/rest/procedure/page',
    method: 'POST',
    data: params
  })
}
/**
 * 工序
 * 修改
 */
export const procedureUpdate = (params: any) => {
  return request({
    url: '/rest/procedure/update',
    method: 'POST',
    data: params
  })
}

/**
 * 设备
 * 新建
 */
export const equipmentCreate = (params: any) => {
  return request({
    url: '/rest/equipment/create',
    method: 'POST',
    data: params
  })
}
/**
 * 设备
 * 删除
 */
export const equipmentDelete = (params: any) => {
  return request({
    url: `/rest/equipment/delete/${params.equipmentId}`,
    method: 'POST',
    data: params
  })
}
/**
 * 设备
 * 列表查询
 */
export const equipmentList = (params: any) => {
  return request({
    url: '/rest/equipment/list',
    method: 'POST',
    data: params
  })
}
/**
 * 设备
 * 分页查询
 */
export const equipmentPage = (params: any) => {
  return request({
    url: '/rest/equipment/page',
    method: 'POST',
    data: params
  })
}
/**
 * 设备
 * 修改
 */
export const equipmentUpdate = (params: any) => {
  return request({
    url: '/rest/equipment/update',
    method: 'POST',
    data: params
  })
}

/**
 * 水箱
 * 新建
 */
export const tankCreate = (params: any) => {
  return request({
    url: '/rest/tank/create',
    method: 'POST',
    data: params
  })
}
/**
 * 水箱
 * 删除
 */
export const tankDelete = (params: any) => {
  return request({
    url: `/rest/tank/delete/${params.tankId}`,
    method: 'POST',
    data: params
  })
}
/**
 * 水箱
 * 列表查询
 */
export const tankList = (params: any) => {
  return request({
    url: '/rest/tank/list',
    method: 'POST',
    data: params
  })
}
/**
 * 水箱
 * 分页查询
 */
export const tankPage = (params: any) => {
  return request({
    url: '/rest/tank/page',
    method: 'POST',
    data: params
  })
}
/**
 * 水箱
 * 修改
 */
export const tankUpdate = (params: any) => {
  return request({
    url: '/rest/tank/update',
    method: 'POST',
    data: params
  })
}
/**
 * 字典
 * 列表
 */
export const getDictList = (params: any) => {
  return request({
    url: '/system/dict/item/list',
    method: 'GET',
    params: params
  })
}
