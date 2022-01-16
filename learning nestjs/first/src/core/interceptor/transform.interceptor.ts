import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as dayjs from 'dayjs'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map(data => {
          // 解构变量加类型, 并重命名
          const { createTime: cT = new Date().toString(), updateTime: uT = '222' }: { createTime: string, updateTime: string } = data
          if (!Array.isArray(data)) {
            if (cT) data.createTime = dayjs(cT).format('YYYY-MM-DD HH:mm')
            if (uT) data.updateTime = dayjs(uT).format('YYYY-MM-DD HH:mm')
          }

          return {
            data,
            code: 0,
            msg: '请求成功'
          }
        })
      );
  }
}
