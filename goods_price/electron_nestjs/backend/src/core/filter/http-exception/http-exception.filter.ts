import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpExceptionBody } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    // 校验管道, 处理字段报错
    const exceptionResponse = exception.getResponse()
    // console.log(exceptionResponse, 111)
    let validMsg = ''
    if (typeof exceptionResponse === 'object') {
      validMsg = (exceptionResponse as HttpExceptionBody).message.toString()
    }
    else {
      validMsg = exceptionResponse
    }

    // 设置错误信息
    const msg = validMsg
      ? validMsg
      : exception.message
        ? exception.message
        : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: {},
      msg,
      code: -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}