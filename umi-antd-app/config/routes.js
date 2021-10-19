const routes = [
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/',
        component: './index',
      },
      { path: '/pages/system/user', component: 'system/user' },
      { path: '/pages/system/userDetail', component: 'system/userDetail' },
      { path: '/pages/system/role', component: 'system/role' },
      { path: '/pages/system/batchAdd', component: 'system/batchAdd' },
    ],
  },
];

export default routes;
