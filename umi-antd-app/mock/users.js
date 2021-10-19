import Mock from 'mockjs';

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
      'id|+1': 1,
      birthday: () => {
        return Mock.Random.date('yyyy-MM-dd');
      },
      remark: '',
    },
  ],
}).list;

let listSearch = (req, res) => {
  // 分页信息
  let pageSize = req.query.pageSize ? req.query.pageSize : 10;
  let currentPage = req.query.currentPage ? req.query.currentPage : 1;
  let sorter = req.query.sorter;
  let order = req.query.order;
  // 查询参数
  let name = req.query.name;
  let code = req.query.code;
  let cardNo = req.query.cardNo;
  let birthdayFrom = req.query.birthday_from;
  let birthdayTo = req.query.birthday_to;
  let phone = req.query.phone;
  let gender = req.query.genderString ? req.query.genderString.split(',') : [];
  let status = req.query.statusString ? req.query.statusString.split(',') : [];

  let results =
    gender.length > 0
      ? listDb.filter(item => gender.indexOf(Number(item.gender).toString()) >= 0)
      : listDb;
  results =
    status.length > 0
      ? results.filter(item => status.indexOf(Number(item.status).toString()) >= 0)
      : results;

  if (name) {
    results = results.filter(item => item.name.indexOf(name) > -1);
  }

  if (code) {
    results = results.filter(item => item.cardNo.indexOf(code) > -1);
  }

  if (cardNo) {
    results = results.filter(item => item.cardNo.indexOf(cardNo) > -1);
  }

  if (phone) {
    results = results.filter(item => item.phone.indexOf(phone) > -1);
  }

  if (birthdayFrom) {
    results = results.filter(item => item.birthday >= birthdayFrom);
  }

  if (birthdayTo) {
    results = results.filter(item => item.birthday <= birthdayTo);
  }

  if (sorter && order) {
    if (order === 'ascend') {
      results.sort((one, two) => {
        if (one[sorter] > two[sorter]) {
          return 1;
        } else if (one[sorter] === two[sorter]) {
          return 0;
        } else {
          return -1;
        }
      });
    } else {
      results.sort((one, two) => {
        if (one[sorter] > two[sorter]) {
          return -1;
        } else if (one[sorter] === two[sorter]) {
          return 0;
        } else {
          return 1;
        }
      });
    }
  }

  let total = results.length;

  if (results.length > pageSize * (currentPage - 1)) {
    results = results.filter(
      (element, index, array) =>
        index >= pageSize * (currentPage - 1) && index < pageSize * currentPage,
    );
  } else {
    currentPage = 1;
    results = results.filter((element, index, array) => index >= 0 && index < pageSize);
  }

  res.send({
    results: results,
    pagination: {
      total: total,
      pageSize: pageSize,
      currentPage: currentPage,
    },
  });
};

let info = (req, res) => {
  let id = req.query.id ? parseInt(req.query.id) : undefined;
  let result = {
    results: {},
    success: true,
  };

  if (!id) {
    result.success = false;
    result.message = '请求参数无效!';
  } else {
    result.results = listDb.find(value => value.id === id);

    if (!result.results) {
      result.success = false;
      result.message = '当前单据已经不存在!';
    }
  }
  res.send(result);
};

let submit = (req, res) => {
  const item = req.body;

  if (item && item.id) {
    let indexItem = listDb.findIndex(i => i.id === item.id);
    if (indexItem > -1) {
      listDb[indexItem] = item;
    }
  } else {
    let createKey = 0;
    listDb.forEach(function(e) {
      if (e.id >= createKey) {
        createKey = e.id + 1;
      }
    });

    item.id = createKey;

    if (!item.cardNo || item.cardNo.length !== 18) {
      item.cardNo = Mock.Random.id();
    }

    listDb.unshift(item);
  }

  res.send({
    success: true,
    results: { info:item },
  });
};

let remove = (req, res) => {
  let ids = req.query.ids ? req.query.ids.split(',') : [];

  if (ids.length > 0) {
    listDb = listDb.filter(item => ids.indexOf(Number(item.id).toString()) === -1);
  }

  res.send({
    success: true,
    message: 'success',
  });
};

let dicInfo = (req, res) => {
  let gender = [{ key: 0, value: '男性' }, { key: 1, value: '女性' }, { key: 2, value: '未知' }]

  let status = [{key:0,value:'离职'},{key:1,value:'在职'}]

  res.send({
    success: true,
    results: {
      gender,
      status,
    },
  });
};

export default {
  '/api/user/list': listSearch,
  '/api/user/info': info,
  'POST /api/user/submit': submit,
  'POST /api/user/remove': remove,
  '/api/user/dic': dicInfo,
};
