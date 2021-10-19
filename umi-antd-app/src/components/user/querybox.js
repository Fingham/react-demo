import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd';
import Proptyps from 'prop-types';
import { dic } from '../../services/user';

const { Option } = Select;

@Form.create()
class QueryBox extends Component {
  static propTypes = {
    searchHandle: Proptyps.func.isRequired,
    resetSearchHandle: Proptyps.func.isRequired,
    dictionary: Proptyps.object,
  };

  state = {
    dictionary: {
      gender: [],
      status: [],
    },
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      let { ...querys } = values;
      if (querys['birthdayfrom']) {
        querys['birthday_from'] = querys['birthdayfrom'].format('YYYY-MM-DD');
      }

      if (querys['birthdayto']) {
        querys['birthday_to'] = querys['birthdayto'].format('YYYY-MM-DD');
      }

      if (querys['gender']) {
        querys['genderString'] = querys['gender'].join(',');
      }

      if (querys['status']) {
        querys['statusString'] = querys['status'].join(',');
      }

      this.props.searchHandle(querys);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
    this.props.resetSearchHandle();
  };

  UNSAFE_componentWillMount() {
    this.fetchDic();
  }

  fetchDic = () => {
    dic().then(data => {
      this.setState({
        dictionary: data.results,
      });
    });
  };

  toggle = () => {};

  render() {
    const {
      form: { getFieldDecorator },
      detail,
    } = this.props;

    const { gender, status } = this.state.dictionary;

    const formAllItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };

    return (
      <Form>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="编 号" {...formAllItemLayout}>
              {getFieldDecorator('code', { initialValue: detail.code })(
                <Input placeholder="请输入账号" style={{ width: '100%' }} />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="姓 名" {...formAllItemLayout}>
              {getFieldDecorator('name', { initialValue: detail.name })(
                <Input placeholder="请输入姓名" />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="身份证" {...formAllItemLayout}>
              {getFieldDecorator('cardNo', { initialValue: detail.cardNo })(
                <Input placeholder="请输入身份证" />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="性 别" {...formAllItemLayout}>
              {getFieldDecorator('gender', { initialValue: detail.gender })(
                <Select mode="multiple" placeholder="请选择性别">
                  {gender.map((item, index) => (
                    <Option value={item.key} key={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="出生日期" {...formAllItemLayout}>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 12px)', margin: '0' }}
              >
                {getFieldDecorator('birthdayfrom', { initialValue: detail.birthdayfrom })(
                  <DatePicker placeholder="开始日期" style={{ width: 'calc(100% - 12px)' }} />,
                )}
              </Form.Item>
              <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>-</span>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(50% - 12px)', margin: '0' }}
              >
                {getFieldDecorator('birthdayto', { initialValue: detail.birthdayto })(
                  <DatePicker placeholder="结束日期" style={{ width: '100%' }} />,
                )}
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状 态" {...formAllItemLayout}>
              {getFieldDecorator('status', { initialValue: detail.status })(
                <Select mode="multiple" placeholder="请选择状态">
                  {status.map((item, index) => (
                    <Option value={item.key} key={item.key}>
                      {item.value}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="联系电话" {...formAllItemLayout}>
              {getFieldDecorator('phone', { initialValue: detail.phone })(
                <Input placeholder="请输入联系电话" />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="邮箱地址" {...formAllItemLayout}>
              {getFieldDecorator('email', { initialValue: detail.email })(
                <Input placeholder="请输入邮箱地址" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <div style={{ float: 'right' }}>
              <Button type="primary" onClick={this.handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    );
  }
}


export default QueryBox