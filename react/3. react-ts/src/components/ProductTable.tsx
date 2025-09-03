import type { Products, StateValue } from './FilterableProductTable'
import styles from '../styles/ProductTable.module.scss'

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  )
}

function ProductRow({ product }: { product: Products[number] }) {
  const name = product.stocked
    ? product.name
    : <span style={{ color: 'red' }}>{product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

interface ProductTableProps extends StateValue {
  products: Products
}
function ProductTable({ products, filterText, inStockOnly }: ProductTableProps) {
  const rows: JSX.Element[] = []
  let lastCategory: null | string = null

  products.map((product) => {
    /* 找不到对应的子串就跳过, 遍历下一个 */
    /* if (product.name.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) === -1) {
      return; // indexOf(sub_str) 找不到则返回-1。includes(sub_str) 找不到则返回false
    } */
    if (!product.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())) {
      return;
    }

    /* 勾选后没库存的不显示, 也就是不渲染 */
    if (inStockOnly && !product.stocked) {
      return;
    }
    /* 同级兄弟关系, 考虑前后顺序即可
    如果类别和前面的不一样, 就单独创建一个新类别 */
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} category={product.category} />)
    }
    rows.push(<ProductRow key={product.name} product={product} />)
    /* 类别赋值 */
    lastCategory = product.category
  })

  return (
    <table className={styles.tb}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default ProductTable