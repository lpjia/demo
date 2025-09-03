import type { Dispatch, SetStateAction } from 'react';
import type { StateValue } from './FilterableProductTable'

interface SearchBarProps extends StateValue {
  setFilterText: Dispatch<SetStateAction<string>>;
  setInStockOnly: Dispatch<SetStateAction<boolean>>;
}
function SearchBar({ filterText, inStockOnly, setFilterText, setInStockOnly }: SearchBarProps) {
  return (
    <form>
      <input value={filterText} onChange={(e) => setFilterText(e.target.value)} type="text" placeholder='Search...' />
      <div>
        <label>
          <input checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} type="checkbox" />
          {" "}Only show products in stock
        </label>
      </div>
    </form>
  )
}

export default SearchBar