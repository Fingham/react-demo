import GlobalRoute from './routes'

const backendUrl = 'http://127.0.0.1:8080';
const backendMockUrl = 'http://127.0.0.1:3005';

const GlobalConfig = {
  treeShaking: true,
  routes: GlobalRoute,
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

console.log('GlobalConfig===>>>>>', GlobalConfig)

export default GlobalConfig;
