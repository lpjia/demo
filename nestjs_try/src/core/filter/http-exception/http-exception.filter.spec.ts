import { ArgumentsHost, BadRequestException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });

  const createHost = () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      header: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const host = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: jest.fn().mockReturnValue(response),
      }),
    } as unknown as ArgumentsHost;

    return { host, response };
  };

  it('应该处理 class-validator 风格的数组错误信息', () => {
    const filter = new HttpExceptionFilter();
    const { host, response } = createHost();
    const exception = new BadRequestException(['title 不能为空', 'content 长度不足']);

    filter.catch(exception, host);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.header).toHaveBeenCalledWith('Content-Type', 'application/json; charset=utf-8');
    expect(response.send).toHaveBeenCalledWith({
      status: 'fail',
      code: 400,
      msg: 'title 不能为空, content 长度不足',
    });
  });

  it('应该处理字符串异常信息', () => {
    const filter = new HttpExceptionFilter();
    const { host, response } = createHost();
    const exception = new HttpException('无权限访问', 403);

    filter.catch(exception, host);

    expect(response.send).toHaveBeenCalledWith({
      status: 'fail',
      code: 403,
      msg: '无权限访问',
    });
  });

  it('异常信息为空时应该对 5xx 返回默认文案', () => {
    const filter = new HttpExceptionFilter();
    const { host, response } = createHost();
    const exception = new HttpException('', 500);

    filter.catch(exception, host);

    expect(response.send).toHaveBeenCalledWith({
      status: 'fail',
      code: 500,
      msg: 'Service Error',
    });
  });

  it('应该处理 InternalServerErrorException 这类对象响应中的字符串 message', () => {
    const filter = new HttpExceptionFilter();
    const { host, response } = createHost();
    const exception = new InternalServerErrorException('服务器异常');

    filter.catch(exception, host);

    expect(response.send).toHaveBeenCalledWith({
      status: 'fail',
      code: 500,
      msg: '服务器异常',
    });
  });

  it('异常信息为空时应该对 4xx 返回默认文案', () => {
    const filter = new HttpExceptionFilter();
    const { host, response } = createHost();
    const exception = new HttpException('', 404);

    filter.catch(exception, host);

    expect(response.send).toHaveBeenCalledWith({
      status: 'fail',
      code: 404,
      msg: 'Client Error',
    });
  });
});
