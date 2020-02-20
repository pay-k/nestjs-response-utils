import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetaResponse } from './response-codes/meta-response';
import { HttpResponsesGenerator } from './http-response.generator';
import { WinstonLogger } from '@payk/nestjs-winston';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TransformResponseInterceptor
  implements NestInterceptor {
  private readonly logger = new WinstonLogger(TransformResponseInterceptor.name);

  /**
   * Ctr
   */
  constructor(
    private readonly responseType,
    mapFn?: (res: MetaResponse<any>) => any,
  ) {
    if (!!mapFn) {
      this.mapResponse = mapFn;
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    // Before
    const request = context?.switchToHttp()?.getRequest();
    return next.handle().pipe(
      map(data => {
        return this.handleAndThrowHttpErrors(data, { ...request?.params, ...request?.query, ...request?.body });
      }),
    );
  }

  private handleAndThrowHttpErrors(
    response: MetaResponse<any>,
    request: any
  ) {
    const httpError = new HttpResponsesGenerator(response, request);
    const httpErrorFullResponse = httpError.fullResponse;

    if (response.mainResponseCode.httpStatus > 399) {
      this.logger.error(HttpStatus[response.mainResponseCode.httpStatus], response);
      throw new HttpException(httpErrorFullResponse, response.mainResponseCode.httpStatus);
    }

    const res = this.mapResponse(response);
    return res;
  }

  private mapResponse(response: MetaResponse<any>) {
    const plain = JSON.stringify(response.value);
    const res = plainToClass(this.responseType, JSON.parse(plain), {
      excludeExtraneousValues: true,
    }) as any;
    return res;
  }
}
