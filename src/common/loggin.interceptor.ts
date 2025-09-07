import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = req;

    const now = Date.now();

    console.log(`API::REQUEST:: [${method} ${url}]`, { params, query, body });

    return next.handle().pipe(
      tap((response) => {
        const time = Date.now() - now;
        console.log(`API::RESPONSE:: [${method} ${url}]`, { response, time });
      }),
    );
  }
}
