import React from 'react';
import styles from './products.css';

import { useModel } from 'umi';
import ProductList from '@/components/ProductList';

// export default function Page() {
//   return (
//     <div>
//       <h1 className={styles.title}>Page products</h1>
//     </div>
//   );
// }

const Products = () =>{
  const {dataSource, reload, deleteProducts } = useModel('useProductList');

  return (
    <div>
      <h1 className={styles.title}>Page products</h1>
    </div>
  );
}