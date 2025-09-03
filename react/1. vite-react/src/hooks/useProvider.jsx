import { useState, createContext, useContext } from 'react';

const DataContext = createContext(); // 创建Context

export function useProvider(initialValue) {
  const [data, setData] = useState(initialValue);
  return { data, setData };
}

export function DataProvider({ children, value }) {
  return (
    // 提供Context
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useInject() {
  return useContext(DataContext); // 使用Context
}