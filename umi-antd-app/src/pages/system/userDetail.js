import React, { Component } from 'react';
import { Form, Input, Card, Row, Col, Button, Select, DatePicker, message } from 'antd';
import Params from '../../utils/common';
import router from 'umi/router';
import { submit, get, dic } from '../../services/user';
import Func from '../../utils/Func';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@Form.create()
class UserDetail extends Component {
  state = {
    detail: {},
    submitting: false,
    pageType: Params.pageType.NONE,
    dictionary: {
      gender: [],
      status: [],
    },
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return;
      }

      this.setState({ submitting: true });

      values.birthday = Func.format(values.birthday, 'YYYY-MM-DD');

      submit(values).then(
        data => {
          data.results.info.birthday = Func.moment(data.results.info.birthday, 'YYYY-MM-DD');
          this.setState({
            submitting: false,
            detail: data.results.info,
            pageType: Params.pageType.EDIT,
          });

          if (data.success) {
            message.success('保存成功!');
          } else {
            message.error(data.message);
          }
        },
        error => {
          this.setState({ submitting: false });
          message.error(error);
        },
      );
    });
  };

  handleBack = () => {
    const routeDate = {
      pathname: '/pages/system/user',
    };
    router.push(routeDate);
  };

  fetch = () => {
    const {
      location: { query },
    } = this.props;

    this.setState({ pageType: query.type });

    //获取数据
    if (query.id) {
      get({ id: query.id }).then(
        data => {
          if (data.success) {
            data.results.birthday = Func.moment(data.results.birthday, 'YYYY-MM-DD');
            this.setState({
              detail: data.results,
            });
          } else {
            message.error(data.message);
            this.handleBack();
          }
        },
        error => {
          message.error(error);
          this.handleBack();
        },
      );
    }
  };

  componentDidMount() {
    this.fetch();
  }

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

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { detail, pageType, submitting } = this.state;

    const { gender, status } = this.state.dictionary;

    const formItemLayout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const formAllItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };

    const disabledEdit = pageType === Params.pageType.EDIT || pageType === Params.pageType.VIEW;
    const disabledView = pageType === Params.pageType.VIEW;

    const showSubmit = pageType === Params.pageType.EDIT || pageType === Params.pageType.ADD;

    const action = (
      <div>
        <Button
          type="primary"
          onClick={this.handleSubmit}
          loading={submitting}
          style={{ display: showSubmit ? 'inline' : 'none' }}
        >
          提交
        </Button>
        <Button
          type="default"
          onClick={this.handleBack}
          loading={submitting}
          style={{ marginLeft: '5px' }}
        >
          返回
        </Button>
      </div>
    );

    return (
      <div>
        <Card title={Params.getPageTypeName(pageType) + '-人员'}>
          <Form disabled={pageType === Params.pageType.VIEW}>
            <Row gutter={24}>
              <Col span={10}>
                <FormItem {...formItemLayout} label="编号">
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: '请输入编号',
                      },
                      {
                        max: 20,
                        message: '允许最大输入20个字符',
                      },
                    ],
                    initialValue: detail.code,
                  })(<Input placeholder="请输入编号" disabled={disabledEdit} />)}
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem {...formItemLayout} label="用户姓名">
                  {getFieldDecorator('name', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户姓名',
                      },
                      {
                        max: 20,
                        message: '允许最大输入20个字符',
                      },
                    ],
                    initialValue: detail.name,
                  })(<Input placeholder="请输入用户姓名" disabled={disabledView} />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <FormItem {...formAllItemLayout} label="身份证">
                  {getFieldDecorator('cardNo', {
                    rules: [
                      {
                        required: true,
                        message: '请输入身份证',
                      },
                      {
                        min: 18,
                        message: '身份证为18位',
                      },
                    ],
                    initialValue: detail.cardNo,
                  })(<Input placeholder="请输入身份证" disabled={disabledView} />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item label="性 别" {...formItemLayout}>
                  {getFieldDecorator('gender', { initialValue: detail.gender })(
                    <Select placeholder="请选择性别" disabled={disabledView}>
                      {gender.map((item, index) => (
                        <Option value={item.key} key={item.key}>
                          {item.value}
                        </Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="出生日期" {...formItemLayout}>
                  {getFieldDecorator('birthday', { initialValue: detail.birthday })(
                    <DatePicker
                      placeholder="开始日期"
                      style={{ width: '100%' }}
                      disabled={disabledView}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item label="状 态" {...formItemLayout}>
                  {getFieldDecorator('status', { initialValue: detail.status })(
                    <Select placeholder="请选择状态" disabled={disabledView}>
                      {status.map((item, index) => (
                        <Option value={item.key} key={item.key}>
                          {item.value}
                        </Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="联系电话" {...formItemLayout}>
                  {getFieldDecorator('phone', { initialValue: detail.phone })(
                    <Input placeholder="请输入联系电话" disabled={disabledView} />,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={10}>
                <Form.Item label="邮箱地址" {...formItemLayout}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: '请按照name@supcon.com的格式输入邮箱地址',
                      },
                    ],
                    initialValue: detail.email,
                  })(<Input placeholder="请输入邮箱地址" disabled={disabledView} />)}
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="id" {...formItemLayout} style={{ display: 'none' }}>
                  {getFieldDecorator('id', {
                    initialValue: detail.id,
                  })(<Input disabled={disabledView} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={20}>
                <Form.Item label="备 注" {...formAllItemLayout}>
                  {getFieldDecorator('remark', { initialValue: detail.remark })(
                    <TextArea
                      placeholder="请输入备注信息"
                      autosize={{ minRows: 4, maxRows: 8 }}
                      disabled={disabledView}
                    />,
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <div style={{ margin: '24px', textAlign: 'right' }}>{action}</div>
      </div>
    );
  }
}

export default UserDetail;
