import { MetaResponse } from './meta-response';
import { ResponseCode } from './response-code';
import { HttpStatus } from '@nestjs/common';
export class MetaResponseGenerator {
  static generateFull<resultType>(
    value: resultType,
    responseCode: ResponseCode) {
    const instance = new MetaResponse();
    instance.value = value;
    instance.addResponseCode(responseCode)
  }

  static generateByResponseCode<resultType>(
    value: resultType,
    responseCode: ResponseCode,
  ): MetaResponse<resultType> {
    const instance = new MetaResponse<resultType>();
    instance.value = value;
    instance.addResponseCode(responseCode);
    return instance;
  }

  static generateAnErrorResponse<resultType>(
    responseCode: ResponseCode,
  ): MetaResponse<resultType> {
    return this.generateByResponseCode(null, responseCode);
  }

  static generateErrorByStatus<resultType>(httpStatus: HttpStatus, error: any) {
    return this.generateByResponseCode(null, new ResponseCode(httpStatus, undefined, undefined, undefined, undefined, error));
  }
}
