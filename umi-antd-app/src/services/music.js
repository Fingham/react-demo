import http from './index';
// eslint-disable-next-line no-unused-vars
import Func from '../utils/Func'
import {stringify} from 'qs'

// 分页获取列表
export function list(params) {
  return http.request({
    path: `/music?${stringify(params)}`,
    method: 'GET'
  });
}