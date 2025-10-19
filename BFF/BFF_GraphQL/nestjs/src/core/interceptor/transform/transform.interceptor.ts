import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { dealwithResp } from 'src/common/utils';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // graphql 返回
    if (context['contextType'] === 'graphql') {
      return next.handle();
    }

    return next.handle().pipe(
      map(data => {
        return {
          data: dealwithResp(data),
          code: 0,
          msg: 'success'
        }
      })
    );
  }
}
