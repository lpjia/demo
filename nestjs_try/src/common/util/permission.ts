const MASK_BITS = 25; // 位掩码（bit mask） // 低25位 = 操作掩码
const MODULE_BITS = 6; // 高6位 = 模块ID
const GROUP_BITS = 5; // look字符串每组的二进制位数
const GROUP_COUNT = 5; // look字符串被分成5组
const LOOK_PREFIX = '0'; // look首字符固定

// curId转look
export function curIdToLook(curId: number): string {
  // 右移25位，提取高6位的模块ID
  const moduleId = curId >>> MASK_BITS; // 无符号右移 >>>, 左边永远补0
  // 取低25位操作掩码
  const mask = curId & ((1 << MASK_BITS) - 1);
  // 例: curId=33554433 = 0b00000001_00000000_00000000_00000001
  // moduleId = 33554433 >>> 25 = 1
  // mask = 33554433 & 0x1FFFFFF = 1 */

  const moduleStr = moduleId.toString(2).padStart(MODULE_BITS, '0');
  // moduleId=1 → "1" → 补6位 → "000001"

  const groups: string[] = [];
  for (let i = GROUP_COUNT - 1; i >= 0; i--) {
    const g = (mask >>> (i * GROUP_BITS)) & ((1 << GROUP_BITS) - 1);
    groups.push(g.toString(2).padStart(GROUP_BITS, '0'));
  }

  return `${LOOK_PREFIX}-${moduleStr}-${groups.join('-')}`;
}

// look转curId
export function lookToCurId(look: string): number {
  const parts = look.split('-');

  const moduleId = parseInt(parts[1], 2); // "000001"(二进制) → 1
  const maskParts = parts.slice(2); // 浅拷贝

  let mask = 0;
  for (let i = 0; i < GROUP_COUNT; i++) {
    const g = parseInt(maskParts[i], 2);
    mask = (mask << GROUP_BITS) | g;
  }

  return (moduleId << MASK_BITS) | mask;
}

// 获取模块id
export function getModuleId(curId: number): number {
  return curId >>> MASK_BITS;
}

// 获取操作掩码
export function getOperationMask(curId: number): number {
  return curId & ((1 << MASK_BITS) - 1);
}

// 判断权限
export function hasPermission(curId: number, operationBit: number): boolean {
  return (getOperationMask(curId) & operationBit) !== 0;
}
