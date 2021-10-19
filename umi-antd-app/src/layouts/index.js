import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd'

function BasicLayout (props) {
  return (
    <ConfigProvider locale={zhCN}>
    {props.children}
    </ConfigProvider>
  );
}

export default BasicLayout;
