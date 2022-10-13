import request from '@/utils/request'
/**
 * 创建字典
 */
export const system_dict_add = (params: any) => {
  return request({
    url: '/system/dict/add',
    method: 'POST',
    data: params
  })
}

/**
 * 删除字典
 */
export const system_dict_delete = (params: any) => {
  return request({
    url: `/system/dict/delete/${params.dictId}`,
    method: 'POST',
    data: params
  })
}

/**
 * 分页查询
 */
export const system_dict_page = (params: any) => {
  return request({
    url: `/system/dict/page`,
    method: 'GET',
    params: params
  })
}
/**
 * 获取字典Map
 */
export const system_dict_all_map = (params: any) => {
  return request({
    url: `/system/dict/all/map`,
    method: 'GET',
    params: params
  })
}

/**
 * 更新字典
 */
export const system_dict_update = (params: any) => {
  return request({
    url: `/system/dict/update`,
    method: 'POST',
    data: params
  })
}

/**
 * 创建字典项
 */
export const system_dict_item_add = (params: any) => {
  return request({
    url: `/system/dict/item/add`,
    method: 'POST',
    data: params
  })
}

/**
 * 删除字典项
 */
export const system_dict_item_delete = (params: any) => {
  return request({
    url: `/system/dict/item/delete/${params.dictItemId}`,
    method: 'POST',
    data: params
  })
}

/**
 * 根据code查询字典项
 */
export const system_dict_item_getByCode = (params: any) => {
  return request({
    url: `/system/dict/item/getByCode`,
    method: 'GET',
    params: params
  })
}
/**
 * 列表查询
 */
export const system_dict_item_list = (params: any) => {
  return request({
    url: `/system/dict/item/list`,
    method: 'GET',
    params: params
  })
}

/**
 * 更新字典项
 */
export const system_dict_item_update = (params: any) => {
  return request({
    url: `/system/dict/item/update`,
    method: 'POST',
    data: params
  })
}