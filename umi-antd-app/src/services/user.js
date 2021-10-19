import http from './index';
// eslint-disable-next-line no-unused-vars
import Func from '../utils/Func'
import {stringify} from 'qs'

// 分页获取列表
export function list(params) {
  return http.request({
    url: `/api/user/list?${stringify(params)}`,
    method: 'GET'
  });
}
// 根据id批量删除
export function removes(params){
  return http.request({
    url: '/api/user/remove',
    method: 'POST',
    params: params
  })
}
// 获取单个实体信息
export function get(params){
  return http.request({
    url: `/api/user/info?${stringify(params)}`,
    method: 'GET'
  })
}
// 提交保存
export function submit(params){
  return http.request({
    url: '/api/user/submit',
    method: 'POST',
    data: params
  })
}
//页面数据字典
export function dic () {
  return http.request({
    url: '/api/user/dic',
    method: 'GET'
  })
}

export function batchSubmit(params){
  return http.request({
    url: '/api/user/batchAdd',
    method: 'POST',
    data: params
  })
}