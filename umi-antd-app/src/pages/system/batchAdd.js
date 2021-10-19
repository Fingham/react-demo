import React, { Component } from 'react'
import Mock from 'mockjs';
import {batchSubmit} from '../../services/user'
import { message } from 'antd';

export default class batchAdd extends Component {

  state = {
    users:[]
  }

  UNSAFE_componentWillMount () {
    
  }

  onBatchSave = () => {

    let listDb = Mock.mock({
      'list|500': [
        {
          name: () => {
            return Mock.Random.cname();
          },
          gender: () => {
            return Mock.Random.integer(0, 2);
          },
          cardNo: () => {
            return Mock.Random.id();
          },
          email: () => {
            return Mock.Random.first() + '@supcon.com';
          },
          phone: /^1[385][1-9]\d{8}/,
          code: () => {
            return Mock.Random.datetime('yyyyMMddHHmmss');
          },
          status: () => {
            return Mock.Random.integer(0, 1);
          },
          birthday: () => {
            return Mock.Random.date('yyyy-MM-dd');
          },
          remark: () => {
            return Mock.Random.csentence(20)
          },
        },
      ],
    }).list;

    batchSubmit(listDb).then(
      data => {
        if (data.success) {
          message.info('保存成功!')
        }
      },
      error => {
        message.info(error)
      },
    );

  }

  render () {
    return (
      <div>
        <button onClick={this.onBatchSave}>批量生成数据</button>
      </div>
    )
  }
}
