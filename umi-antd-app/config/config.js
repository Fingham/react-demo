import routes from './routes'

export default {
  treeShaking: true,
  routes,
  // "theme": {
  //   "primary-color": "#1DA57A",
  // },
  // exportStatic: {},
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'umi-antd-app',
        dll: false,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
