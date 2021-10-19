import React, { Component } from 'react';
import { Button, Menu, Dropdown } from 'antd';
const ButtonGroup = Button.Group;

export default class ToolBar extends Component {
  render() {
    const {
      expand,
      handle: { addHandle, editHandle, viewHandle, deleteHandle, queryHandle, commonHandle },
    } = this.props;

    const menu = (
      <Menu onClick ={commonHandle}>
        <Menu.Item key="lock" >禁用</Menu.Item>
        <Menu.Item key="unlock" >启用</Menu.Item>
        <Menu.Item key="audit" >审批</Menu.Item>
      </Menu>
    );

    return (
      <div style={{padding:'5px'}}>
        <ButtonGroup>
          <Button icon="plus" onClick={addHandle}>
            新 增
          </Button>
          <Button icon="edit" onClick={editHandle}>
            修 改
          </Button>
          <Button icon="delete" onClick={deleteHandle}>
            删 除
          </Button>
          <Button icon="info-circle" onClick={viewHandle}>
            查 看
          </Button>
          <Dropdown overlay={menu}>
            <Button icon="bars">
              更多操作
            </Button>
          </Dropdown>
          <Button style={{textAlign:'right'}}  icon={expand?"up":"down"} type="dashed" onClick={queryHandle}>查 询</Button>
        </ButtonGroup>
      </div>
    );
  }
}
