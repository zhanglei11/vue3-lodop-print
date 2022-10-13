import cookie from 'js-cookie'

const tokenTableName = 'DS-token'
/**
 * @description 获取accessToken
 */

export const getAccessToken = () => {
  return cookie.get(tokenTableName)
}

/**
 * @description 存储accessToken
 * @param accessToken
 */
export const setAccessToken = (accessToken: string) => {
  cookie.set(tokenTableName, accessToken)
}

/**
 * @description 移除accessToken
 */
export const removeAccessToken = () => {
  cookie.remove(tokenTableName)
}
