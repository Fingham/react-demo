const Params = {
  pageType: {
    ADD: 'Add',
    EDIT: 'Edit',
    VIEW: 'View',
    DELETE: 'Delete',
    FLOW: 'Flow',
    NONE: 'None',
  },
  getPageTypeName: type => {
    let name = '';
    switch (type) {
      case 'Add':
        name = '新增';
        break;
      case 'Edit':
        name = '修改';
        break;
      case 'View':
        name = '查看';
        break;
      case 'Delete':
        name = '删除';
        break;
      case 'Flow':
        name = '流程查看';
        break;
      default:
        name = '';
    }

    return name;
  },
};

export default Params;
