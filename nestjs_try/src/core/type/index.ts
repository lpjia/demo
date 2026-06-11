export interface Resp {
  status: 'success' | 'fail';
  code: number;
  msg: string;
  data?: unknown;
}

export interface JwtPayload {
  ulid: string
  username: string
  role: number
  gv: number
}
