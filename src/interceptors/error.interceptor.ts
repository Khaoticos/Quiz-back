import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      catchError((err) => {
        console.error(`API::RESPONSE::ERROR:: [${method} ${url}]`, {
          error_message: err.message || err,
          stack: err.stack || 'No stack trace available',
        });
        return throwError(() => err);
      }),
    );
  }
}
