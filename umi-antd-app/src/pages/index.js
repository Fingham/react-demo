import styles from './index.css';


export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>你正在查看一个超级牛逼的首页，当然你必须定制化自己的页面！</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
        <li><a href="/pages/system/user">用户列表</a></li>
        <li><a href="/pages/system/role">角色列表</a></li>
        <li><a href="/pages/system/batchAdd">batchAdd</a></li>
      </ul>
    </div>
  );
}
