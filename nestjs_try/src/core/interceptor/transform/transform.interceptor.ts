import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { convertDate, isObject } from '../../util';
import { Resp } from '../../type';

interface ServiceResp {
  _respMsg?: string;
  _respData?: unknown;
  [key: string]: unknown;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /* http */
    return next.handle().pipe(
      map((data): Resp => {
        // console.log('服务层传来的data:', data)

        // 不是对象数据就直接返回给前端
        if (!isObject(data)) {
          return {
            status: 'success',
            code: 200,
            msg: '',
            data,
          }
        }

        const {
          _respMsg = '',
          _respData, // 使用这个属性, 响应不会增加意想不到的字段
          ...restData
        } = (data ?? {}) as ServiceResp;

        // 优先使用服务层显式返回的 _respData, 否则兜底使用普通业务数据字段
        const finalData = _respData ?? (Object.keys(restData).length ? restData : null);

        return {
          status: 'success',
          code: 200,
          msg: _respMsg,
          data: convertDate(finalData),
        }
      })
    );
  }
}
