export interface Store {
  getData(key: string): Promise<any>
  setData(key: string, data: any): Promise<void>
  hasData(key: string): Promise<boolean>
}