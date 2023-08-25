import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class CommonErrorhandlerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error, caught) => {
        Logger.error(error);
        return of('MicroService is down, Please retry in some time');
      })
    );
  }
}
