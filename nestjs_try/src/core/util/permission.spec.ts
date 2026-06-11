import { lookToCurId, curIdToLook, getModuleId, getOperationMask, hasPermission } from './permission';

describe('permission', () => {
  describe('lookToCurId / curIdToLook', () => {
    it('role_mana 角色页面(bit0)', () => {
      const look = '0-000001-00000-00000-00000-00000-00001';
      const curId = lookToCurId(look);
      expect(curId).toBe(33554433);
      expect(curIdToLook(curId)).toBe(look);
    });

    it('role_mana 创建角色(bit1)', () => {
      const look = '0-000001-00000-00000-00000-00000-00010';
      const curId = lookToCurId(look);
      expect(curId).toBe(33554434);
      expect(curIdToLook(curId)).toBe(look);
    });

    it('role_mana 修改角色(bit2)', () => {
      const look = '0-000001-00000-00000-00000-00000-00100';
      expect(lookToCurId(look)).toBe(33554436);
    });

    it('role_mana 删除角色(bit3)', () => {
      const look = '0-000001-00000-00000-00000-00000-01000';
      expect(lookToCurId(look)).toBe(33554440);
    });

    it('role_mana 页面级(无操作位)', () => {
      const look = '0-000001-00000-00000-00000-00000-00000';
      const curId = lookToCurId(look);
      expect(curId).toBe(33554432);
      expect(curIdToLook(curId)).toBe(look);
    });

    it('模块2 删除(bit3)', () => {
      const look = '0-000010-00000-00000-00000-00000-01000';
      const curId = lookToCurId(look);
      expect(curId).toBe(67108872);
      expect(getModuleId(curId)).toBe(2);
      expect(curIdToLook(curId)).toBe(look);
    });

    it('最大模块ID(63) + 全操作位掩码', () => {
      const look = '0-111111-11111-11111-11111-11111-11111';
      const curId = lookToCurId(look);
      expect(getModuleId(curId)).toBe(63);
      expect(getOperationMask(curId)).toBe((1 << 25) - 1);
      expect(curIdToLook(curId)).toBe(look);
    });

    it('最小值 模块0 无操作', () => {
      const look = '0-000000-00000-00000-00000-00000-00000';
      const curId = lookToCurId(look);
      expect(curId).toBe(0);
      expect(curIdToLook(curId)).toBe(look);
    });
  });

  describe('getModuleId', () => {
    it('从 curId 提取模块ID', () => {
      expect(getModuleId(33554433)).toBe(1);
      expect(getModuleId(67108872)).toBe(2);
      expect(getModuleId(0)).toBe(0);
    });
  });

  describe('getOperationMask', () => {
    it('从 curId 提取操作掩码', () => {
      expect(getOperationMask(33554433)).toBe(1);
      expect(getOperationMask(33554434)).toBe(2);
      expect(getOperationMask(33554436)).toBe(4);
      expect(getOperationMask(33554440)).toBe(8);
    });
  });

  describe('hasPermission', () => {
    it('角色页面有查看权限(bit0)', () => {
      expect(hasPermission(33554433, 1)).toBe(true);
    });

    it('角色页面无创建权限(bit1)', () => {
      expect(hasPermission(33554433, 2)).toBe(false);
    });

    it('创建角色有创建权限(bit1)', () => {
      expect(hasPermission(33554434, 2)).toBe(true);
    });

    it('创建角色无查看权限(bit0)', () => {
      expect(hasPermission(33554434, 1)).toBe(false);
    });

    it('多权限掩码检查 (查看+创建)', () => {
      const curId = (1 << 25) | 3; // bit0 + bit1
      expect(hasPermission(curId, 1)).toBe(true);
      expect(hasPermission(curId, 2)).toBe(true);
      expect(hasPermission(curId, 4)).toBe(false);
    });
  });
});
