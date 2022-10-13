import axios from 'axios';
import { getAccessToken } from '@/utils/accessToken';
import router from '../router'

const handleCode = (data: any) => {
  switch (data.errorCode) {
  case '00000':
    // setMessageTips(data)
    // message.error(`${msg}`);
    break;
  case 402:
    // message.error(`后端接口${code}异常`);
    break;
  case 401:
    // message.error(`无此接口权限`);
    break;
  case 'A0170':
    router.push('/login')
    break;
  default:
    // message.error(`后端接口${code}异常`);
    break;
  }
};
const instance = axios.create({
  timeout: 10000,
  baseURL: '/dss/api',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

/**
 * 请求拦截
 */
instance.interceptors.request.use(async (config: any) => {
  let sessionToken = getAccessToken();

  config.headers.Authorization = sessionToken;
  let userId = sessionStorage.getItem('userId');

  config.headers.userId = userId;
  return config;
});

/**
 * 响应拦截
 */
instance.interceptors.response.use(
  (response: any) => {
    const { data, config, status } = response;
    const { errorCode, errorMessage } = data;

    if (status === 200) {
      handleCode(data);
      return data;
    }
    handleCode(data);
    return Promise.reject(
      '请求异常:' + JSON.stringify({ url: config.url, errorCode, errorMessage }) || 'Error'
    );

  },
  (error: any) => {
    // const { response, message } = error;

    // if (error.response && error.response.data) {
    //   const { status, data } = response;

    //   return Promise.reject(error);
    // }
    // let { message } = error;
    // if (message === "Network Error") {
    //   message = "后端接口连接异常";
    // }
    // if (message.includes("timeout")) {
    //   message = "后端接口请求超时";
    // }
    // if (message.includes("Request failed with status code")) {
    //   const code = message.substr(message.length - 3);
    //   message = "后端接口" + code + "异常";
    // }
    return Promise.reject(error);

  }
);
export default instance;
