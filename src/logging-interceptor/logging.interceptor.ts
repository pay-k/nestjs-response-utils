import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, throwError, of } from 'rxjs';
  import { tap, catchError, map } from 'rxjs/operators';
import { IncomingMessage } from 'http';
import { WinstonLogger } from '@payk/nestjs-winston';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new WinstonLogger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const { body, params, query, headers, method, url, route } = context.getArgs().find((a) => a instanceof IncomingMessage )
      this.logger.info(`Request: To path: ${route.path} (${url}) with method ${method}`, { body, params, query, headers, method, url, path: route.path} )

      return next
        .handle()
        .pipe(tap((response) =>  {
          let httpResponse = context.switchToHttp().getResponse();
          this.logger.info(`Response: To ${url} with method ${method}, status code: ${httpResponse.statusCode}`, { response: { headers: httpResponse.getHeaders(), statusCode: httpResponse.statusCode, body: response }, request: { body, params, query, headers, method, url, path: route.path }})
        })).pipe(catchError((err) => {
          let httpResponse = context.switchToHttp().getResponse();
          let statusCode = err?.status;
          this.logger.error(`Response: To ${url} with method ${method}, status code: ${statusCode ?? httpResponse.statusCode}`, { response: { headers: httpResponse.getHeaders(), statusCode: httpResponse.statusCode, error: err }, request: { body, params, query, headers, method, url, path: route.path }})
          return throwError(err)
        }));
    }
  }