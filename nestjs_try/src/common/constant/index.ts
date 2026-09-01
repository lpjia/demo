export const articleTypeMap = {
  1: '未知',
  2: '原创',
  3: '转载'
} as const;

export const userRoleMap = {
  1: 'root',
  2: 'admin',
  3: 'author',
  4: 'visitor',
  5: 'super_admin'
} as const;

export const articleIsRecommendMap = {
  1: '推荐',
  2: '不推荐'
} as const;

export const articleStatusMap = {
  1: 'draft',
  2: 'publish'
} as const;

/** 内置超级管理员账号 */
export const BUILTIN_ADMIN = {
  ULID: '01BUILTIN0000000000000000',
  USERNAME_PREFIX: 'super_root_',
  PASSWORD: '@@n06mFme!',
  ROLE: 1 as const,
  NICKNAME: 'SuperRoot',
  EMAIL: '',
  AVATAR: ''
} as const;
