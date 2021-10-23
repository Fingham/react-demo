import axios from 'axios'
import GlobalConfig from './../../config/config'
// eslint-disable-next-line no-unused-vars

console.log('(这个环境取的值没有生效) ', process.env)

const enableMock = true;
const BASE_API = enableMock? "http://127.0.0.1:3005": "http://127.0.0.1:8000"

const RequestType = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'Delete',
};

// eslint-disable-next-line no-unused-vars
class RequestParam{

    constructor(){
       this.url=null
       this.path=null
       this.param=null
       this.requestType=RequestType.GET
    }

} 



/**
 *
 * @class HttpRequest
 */
class HttpRequest {
  /**
   *Creates an instance of HttpRequest.
   * @memberof HttpRequest
   */
  constructor () {
    // loading 加载多请求等待
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      headers: {}
    }
    return config
  }
  interceptors (instance) {
    console.log('interceptors--instance', instance.interceptors.request);
    instance.interceptors.request.use(config => {
      // 后期jwt认证是采用
      // const token = sessionStorage.getItem('token')
      // if (token && token.length > 0) {
      //   config.headers['Authorization'] = 'Bearer ' + token
      // }
      return config
    }, error => {
      return Promise.reject(error)
    })

    instance.interceptors.response.use(res => {
      return res.data
    }, error => {
      if (error.response.status === 401) {
        // console.log('当前请求需要身份认证!')
      }
      if (error.response.status === 403) {
        // console.log('当前请求无权访问!')
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create({
      baseURL: BASE_API + options['path'],
      timeout: 5000,
      timeoutErrorMessage: '温馨提示,请求超时!!!'
    })
    options = Object.assign(this.getInsideConfig(), options)
    console.log('request>>>>>>>>>>>>', options)
    this.interceptors(instance)
    return instance(options)
  }
}

export default HttpRequest
