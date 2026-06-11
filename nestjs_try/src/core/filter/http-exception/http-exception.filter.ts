import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpExceptionBody } from '@nestjs/common';
import { Resp } from '../../type';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    const exceptionResponse = exception.getResponse()
    console.log('校验异常:', exceptionResponse)
    let exceptionMsg = ''
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const message = (exceptionResponse as HttpExceptionBody).message

      // class-validator 校验后, 异常默认走这个分支, 因为可能有多个条件校验不通过
      // ['title字段不能为空', 'author字段不能为空', 'type字段必须为整数']
      if (Array.isArray(message)) {
        exceptionMsg = message.join(', ')
      }

      // HttpException子类实例走这个分支, throw new NotFoundException();
      // throw new InternalServerErrorException() Internal Server Error
      else if (typeof message === 'string') {
        exceptionMsg = message === 'Unauthorized'
          ? '未登录或token错误或token失效'
          : message
      }
    }
    // throw new HttpException('HttpException类', 400); 走这个分支
    // 如果一参用obj来提供更多信息, 则认为obj替换掉string的位置, 去走分支
    else {
      exceptionMsg = exceptionResponse
    }

    // 设置错误信息
    const msg = exceptionMsg
      ? exceptionMsg
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    const errorResponse: Resp = {
      status: 'fail',
      code: status,
      msg,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(200); // response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}


