import request from '@/utils/request'
/**
* 超市
* 分页
*/
export const supermarketPage = (params: any) => {
  return request({
    url: '/base/supermarket/page',
    method: 'GET',
    params: params
  })
}
/**
* 超市
* 列表
*/
export const getsupermarketList = (params: any) => {
  return request({
    url: '/base/supermarket/list',
    method: 'GET',
    params: params
  })
}
/**
 * 超市
 * 新建
 */
export const supermarketCreate = (params: any) => {
  return request({
    url: '/base/supermarket/add',
    method: 'POST',
    data: params
  })
}
/**
 * 超市
 * 删除
 */
export const supermarketDelete = (params: any) => {
  return request({
    url: `/base/supermarket/delete/${params.id}`,
    method: 'POST',
    data: params
  })
}
/**
* 超市
* 修改
*/
export const supermarketEdit = (params: any) => {
  return request({
    url: '/base/supermarket/edit',
    method: 'POST',
    data: params
  })
}
/**
* 物料关系
* 新建
*/
export const supermarketRelationCreate = (params: any) => {
  return request({
    url: '/base/supermarket/material/add',
    method: 'POST',
    data: params
  })
}
/**
* 物料关系
* 删除
*/
export const supermarketRelationDelete = (params: any) => {
  return request({
    url: `base/supermarket/material/delete/${params.id}`,
    method: 'POST',
    data: params
  })
}

/**
* 物料关系
* 分页
*/
export const supermarketRelationPage = (params: any) => {
  return request({
    url: '/base/supermarket/material/page',
    method: 'GET',
    params: params
  })
}
/**
* 超市
* 新建
*/
export const procedureCreate = (params: any) => {
  return request({
    url: '/base/supermarket/add',
    method: 'POST',
    data: params
  })
}

/**
* 通道
* 新建
*/
export const channelCreate = (params: any) => {
  return request({
    url: '/base/channel/add',
    method: 'POST',
    data: params
  })
}
/**
* 通道
* 删除
*/
export const channelDelete = (params: any) => {
  return request({
    url: `/base/channel/delete/${params.id}`,
    method: 'POST',
    data: params
  })
}
/**
* 通道
* 修改
*/
export const channelEdit = (params: any) => {
  return request({
    url: '/base/channel/edit',
    method: 'POST',
    data: params
  })
}
/**
* 通道
* 列表查询
*/
export const getchannelList = (params: any) => {
  return request({
    url: '/base/channel/list',
    method: 'GET',
    params: params
  })
}
/**
* 通道
* 分页
*/
export const channelPage = (params: any) => {
  return request({
    url: '/base/channel/page',
    method: 'GET',
    params: params
  })
}


/**
* 物料
* 新建
*/
export const materialCreate = (params: any) => {
  return request({
    url: '/base/material/add',
    method: 'POST',
    data: params
  })
}
/**
* 物料
* 删除
*/
export const materialDelete = (params: any) => {
  return request({
    url: `/base/material/delete/${params.id}`,
    method: 'POST',
    data: params
  })
}
/**
* 物料
* 修改
*/
export const materialEdit = (params: any) => {
  return request({
    url: '/base/material/edit',
    method: 'POST',
    data: params
  })
}
/**
* 物料
* 列表
*/
export const getmaterialtList = (params: any) => {
  return request({
    url: '/base/material/list',
    method: 'GET',
    params: params
  })
}
/**
* 物料
* 分页
*/
export const materialPage = (params: any) => {
  return request({
    url: '/base/material/page',
    method: 'GET',
    params: params
  })
}


/**
* blister
* 新建
*/
export const blisterCreate = (params: any) => {
  return request({
    url: '/base/blister/add',
    method: 'POST',
    data: params
  })
}
/**
* blister
* 删除
*/
export const blisterDelete = (params: any) => {
  return request({
    url: `/base/blister/delete/${params.id}`,
    method: 'POST',
    data: params
  })
}
/**
* blister
* 修改
*/
export const blisterEdit = (params: any) => {
  return request({
    url: '/base/blister/edit',
    method: 'POST',
    data: params
  })
}
/**
* blister
* 分页
*/
export const blisterPage = (params: any) => {
  return request({
    url: '/base/blister/page',
    method: 'GET',
    params: params
  })
}
/**
* blister
* 列表
*/
export const getblisterList = (params: any) => {
  return request({
    url: '/base/blister/list',
    method: 'GET',
    params: params
  })
}


/**
* klt
* 新建
*/
export const kltCreate = (params: any) => {
  return request({
    url: '/base/klt/add',
    method: 'POST',
    data: params
  })
}
/**
* klt
* 删除
*/
export const kltDelete = (params: any) => {
  return request({
    url: `/base/klt/delete/${params.id}`,
    method: 'POST',
    data: params
  })
}
/**
* klt
* 修改
*/
export const kltEdit = (params: any) => {
  return request({
    url: '/base/klt/edit',
    method: 'POST',
    data: params
  })
}
/**
* klt
* 分页
*/
export const kltPage = (params: any) => {
  return request({
    url: '/base/klt/page',
    method: 'GET',
    params: params
  })
}
/**
* klt
* 列表
*/
export const getkltList = (params: any) => {
  return request({
    url: '/base/klt/list',
    method: 'GET',
    params: params
  })
}


