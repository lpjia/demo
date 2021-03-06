import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { isExistField, formatDisplayTime } from 'src/utils/commonMethods';

// Interceptor 拦截器
// Injectable 可注射的
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => {
          /**
           * 分页数据
           * pageNum, // 第几页
           * pageSize, // 每页条数
           * total / count, // 总条数
           * list, // 数据
           */
          if (
            isExistField(data) &&
            isExistField(data.pageNum) &&
            isExistField(data.pageSize) &&
            isExistField(data.count) &&
            isExistField(data.list)
          ) {
            for (const item of data.list) {
              formatDisplayTime(item)
            }
          }

          // 单独返回一个数组
          if (Array.isArray(data)) {
            for (const item of data) {
              formatDisplayTime(item)
            }
          }

          // 单独返回一个 obj
          formatDisplayTime(data)

          return {
            data,
            code: 0,
            msg: '请求成功'
          }
        })
      );
  }
}
