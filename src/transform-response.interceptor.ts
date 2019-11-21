import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpCodesNames } from './http-codes-names.enums';
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
    if (mapFn === null) {
      mapFn = this.mapResponse;
    }
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    // Before
    return next.handle().pipe(
      map(data => {
        return this.handleAndThrowHttpErrors(data, {});
      }),
    );
  }

  private handleAndThrowHttpErrors(
    response: MetaResponse<any>,
    request: any,
    logMessage?: string,
  ) {
    const httpError = new HttpResponsesGenerator(
      response.mainResponseCode.code,
      response.mainResponseCode.errorMessage,
      request,
      response.mainResponseCode.property || 'userId',
      { error: response.mainResponseCode.httpCodeName },
    );
    const httpErrorFullResponse = httpError.fullResponse;

    if (response.mainResponseCode.httpCodeName === HttpCodesNames.BadRequest) {
      this.logger.info(logMessage || 'BadRequest', response);
      throw new BadRequestException(httpErrorFullResponse);
    }
    if (response.mainResponseCode.httpCodeName === HttpCodesNames.NotFound) {
      this.logger.info(logMessage || 'NotFound', response);
      throw new NotFoundException(httpErrorFullResponse);
    }

    if (
      response.mainResponseCode.httpCodeName === HttpCodesNames.GeneralError
    ) {
      this.logger.error(logMessage || 'GeneralError', response);
      throw new InternalServerErrorException(httpErrorFullResponse);
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
