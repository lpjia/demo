import {
  removeObjEmptyKey, deepClone, objKeyToOrmField
} from '../util/commonMethod.js'


// 过滤掉为空的 key, 不过滤 0 false
const includeNullFieldsObj = {
  emptyObj: {},
  emptyArr: [],
  emptyUndefined: undefined,
  emptyNull: null,
  emptyNum: NaN,
  emptyString: '',
  isFalse: false,
  num: 0,
}
const excludeNullFieldsObj = removeObjEmptyKey(includeNullFieldsObj)
console.log('过滤:', excludeNullFieldsObj)
const excludeNullFieldsObj_2 = removeObjEmptyKey(deepClone(includeNullFieldsObj), ['array', 'object'])
console.log('空对象和空数组也过滤掉:', excludeNullFieldsObj_2)
console.log('---- 分割线 ----\n\n\n')




// 把普通对象转换成orm需要的数据结构
console.log(objKeyToOrmField(excludeNullFieldsObj_2))
const queryParam = {
  currPage: '1',
  limit: '15',
  produceName: '芹菜',
  unitPrice: '6',
}
const universalQueryFields = objKeyToOrmField(queryParam, {
  assign: {
    one: '111',
    two: '222',
  },
  exclude: ['currPage', 'limit']
})
console.log('universalQueryFields:', universalQueryFields)
console.log('---- 分割线 ----\n\n\n')