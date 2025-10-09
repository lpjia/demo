import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { dealwithResp } from 'src/common/utils';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // console.log(data, 111)
        return {
          // data: convertDates(data),
          data: dealwithResp(data),
          code: 0,
          msg: 'success'
        }
      })
    );
  }
}
