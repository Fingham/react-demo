import React, { Component } from 'react';
import { Table, Tag, Card, Affix, message, Modal, Button } from 'antd';
import Params from '../../utils/common';
import router from 'umi/router';
import ToolBar from '../../components/user/toolbar';
import QueryBox from '../../components/user/querybox';

import { list, removes, dic } from '../../services/user';

export default class User extends Component {

  state = {
    expand: false,
    data: [],
    pagination: { showSizeChanger: true, showQuickJumper: true, total: 0 },
    loading: false,
    queryParams: {},
    selectedRows: [],
    dic: {},
  };

  addHandle = () => {
    const routeDate = {
      pathname: '/pages/system/userDetail',
      query: { id: '', type: Params.pageType.ADD },
    };
    router.push(routeDate);
  };

  editHandle = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length !== 1) {
      message.warn('请先选择一条数据!');
      return;
    }

    const routeDate = {
      pathname: '/pages/system/userDetail',
      query: { id: selectedRows[0].id, type: Params.pageType.EDIT },
    };
    router.push(routeDate);
  };

  viewHandle = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length !== 1) {
      message.warn('请先选择一条数据!');
      return;
    }

    const routeDate = {
      pathname: '/pages/system/userDetail',
      query: { id: selectedRows[0].id, type: Params.pageType.VIEW },
    };
    router.push(routeDate);
  };

  deleteHandle = () => {
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      message.warn('请先选择一条数据!');
      return;
    }

    Modal.confirm({
      title: '提示',
      content: `是否确定删除当前选中的 ${selectedRows.length} 条数据？`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const ids = selectedRows.map(item => item.id).join(',');

        removes({ ids: ids }).then(
          data => {
            if (data.success) {
              message.success('删除成功!');
              this.fetch();
            } else {
              message.error(data.message);
            }
          },
          error => {
            this.setState({ submitting: false });
            message.error(error);
          },
        );
      },
    });
  };

  queryHandle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  commonHandle = (item) => {
    message.info(`${item.key}:当前功能待完善!`)
  }

  searchHandle = params => {
    this.setState({ queryParams: params });

    let { ...querys } = params;
    delete querys.birthdayfrom;
    delete querys.birthdayto;
    delete querys.gender;
    delete querys.status;

    console.log(querys)

    this.fetch({
      ...querys,
    });
  };

  resetSearchHandle = () => {
    this.setState({ queryParams: {} });
  };

  initData = () => {
    this.fetchDic();
    this.fetch();
  };

  UNSAFE_componentWillMount() {
    this.initData();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      sorter: sorter.field,
      order: sorter.order,
      ...this.state.queryParams,
    });
  };

  fetch = (params = {}) => {
    this.setState({ loading: true });

    list(params).then(
      data => {
        const pagination = { ...this.state.pagination };
        pagination.total = data.pagination.total;
        this.setState({
          loading: false,
          data: data.results,
          pagination,
        });
      },
      error => {
        this.setState({ loading: false });
      },
    );
  };

  fetchDic = () => {
    dic().then(
      data => {
        this.setState({
          dic: data.results,
        });
      },
      error => {
        message.error(error);
      },
    );
  };

  changeGender = gender => {
    const item = this.state.dic.gender.filter((e, i) => e.key === gender);
    let textString = item && item.length > 0 ? item[0].value : '';

    let color = 'purple';

    if (gender === 0) {
      color = 'blue';
    } else if (gender === 1) {
      color = 'magenta';
    }

    return <Tag color={color}>{textString}</Tag>;
  };

  changeStatus = status => {
    const item = this.state.dic.status.filter((e, i) => e.key === status);
    let textString = item && item.length > 0 ? item[0].value : '';
    return textString;
  };

  onSelectRow = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  onTestClick = () =>{
    console.log("onTestClick====>");
  }

  render() {
    const columns = [
      {
        dataIndex: 'id',
        key: 'id',
        title: '主键',
        width: 70,
        align: 'right',
      },
      {
        title: '编号',
        dataIndex: 'code',
        sorter: true,
        align: 'right',
        width: 80,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: 120,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        align: 'center',
        width: 80,
        render: gender => this.changeGender(gender),
      },
      {
        title: '身份证',
        dataIndex: 'cardNo',
        width: 180,
      },
      {
        title: '出生日期',
        dataIndex: 'birthday',
        sorter: true,
        width: 120,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 80,
        align: 'center',
        render: status => this.changeStatus(status),
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        width: 120,
      },
      {
        title: '邮箱地址',
        dataIndex: 'email',
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectRow(selectedRows);
      },
      getCheckboxProps: record => ({
        code: record.code,
      }),
    };

    return (
      <div>
        <Affix>
          <ToolBar
            handle={{
              addHandle: this.addHandle,
              editHandle: this.editHandle,
              viewHandle: this.viewHandle,
              deleteHandle: this.deleteHandle,
              queryHandle: this.queryHandle,
              commonHandle:this.commonHandle
            }}
            expand={this.state.expand}
          />
          
        </Affix>
        <Affix><Button type="primary" onClick={this.onTestClick}>测试按钮</Button></Affix>
        <Card bordered={false} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <QueryBox
            searchHandle={this.searchHandle}
            resetSearchHandle={this.resetSearchHandle}
            detail={this.state.queryParams}
          />
        </Card>
        <Table
          dataSource={this.state.data}
          rowKey={record => record.id}
          columns={columns}
          size="small"
          loading={this.state.loading}
          pagination={this.state.pagination}
          rowSelection={rowSelection}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}
