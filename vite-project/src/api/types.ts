export interface I_LoginParams {
  username: string,
  password: string,
}

export interface I_LoginApi {
  login: (params: I_LoginParams) => Promise<any>
}