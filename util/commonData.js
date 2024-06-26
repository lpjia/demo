import { reverseMapping, manyToOne } from './commonMethod.js'

// 表单项提示信息
export const placeholderTxt = {
  input: '请输入',
  select: '请选择',
  ip: '请输入IP地址',
}


// 颜色
export const colorObj = {
  gray: '#909399',
  // gray: '#c1bfbf',
  // red: '#F56C6C',
  red: '#ff0000',
  // green: '#67C23A',
  // green: '#008000',
  green: '#00ff00',
  blue: '#409EFF',
  orange: '#E6A23C',
}


// 设备映射
export const device_type = {
  1: "一氧化碳",
  2: "红外门禁",
  3: "摄像机",
  4: "接地环流",
  5: "风机",
  6: "水泵",
  7: "氧气",
  8: "湿度",
  9: "声光",
  10: "温度",
  11: "烟感",
  12: "硫化氢",
  13: "甲烷",
  14: "防火门",
  15: "液位"
}


// 设备单位映射
export const device_unit = {
  1: "ppm",
  2: "",
  3: "",
  4: "A",
  5: "",
  6: "",
  7: "%vol",
  8: "%rh",
  9: "",
  10: "℃",
  11: "",
  12: "ppm",
  13: "%lel",
  14: "",
  15: "cm"
}


// 设备类型反向映射
export const device_type_reverse = reverseMapping(device_type)

// 设备分组
/**
* 1:CO, 7:O2, 12:H2S, 13:CH4 四种气体
* 8:湿度, 10:温度
* 15 液位
* 5 风机
* 6 水泵
* 4 接地环流
* 14 防火门
* 2 红外
* 11 烟感
*/
const deviceGroupMap = {
  '15|5|6|4|14|2|11': 'oneLine',
  '8|10': 'twoLine',
  '1|7|12|13': 'fourLine',
}
export const getGroupByDevice = manyToOne(deviceGroupMap)

// 设备图片分组
const deviceImgGroupMap = {
  '2': 'infrared',
  '4': 'groundingCirculation',
  '5': 'fan',
  '6': 'waterPump',
  '11': 'smoke',
  '14': 'fireDoor',
  '15': 'liquid',
  '8|10': 'TH',
  '1|7|12|13': 'gas',
}
export const getImgGroupByDevice = manyToOne(deviceImgGroupMap)


// 报警级别
export const alarmLevelObj = {
  2: '报警',
  1: '预警',
  // 0: '提示',
}


// 设备传感器控制
// 风机和防火门是一组, 红外门禁是一组
const sensorControlGroupMap = {
  '2': 'oneCheck',
  '5|14': 'twoCheck',
  '6': 'state',
}
export const getControlGroupBySensor = manyToOne(sensorControlGroupMap)


// 联动状态
export const deviceLinkObj = {
  0: '未联动',
  1: '已联动',
}


// 消防的设备状态
export const fireSensorStatus = {
  255: '全部',
  0: '正常',
  1: '火警',
  2: '故障',
  3: '启动',
  4: '停动',
  5: '隔离',
  6: '释放',
  7: '监管',
  8: '反馈',
  9: '动作',
  10: '复位',
  // 255: '全部',
}