import axios from 'axios'

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
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}

export default HttpRequest
