import { MetaResponse } from './meta-response';
import { ResponseCode } from './response-code';
import { HttpStatus } from '@nestjs/common';
export class MetaResponseGenerator {
  /**
   *
   *
   * @static
   * @template resultType
   * @param {resultType} value
   * @param {ResponseCode} responseCode
   * @memberof MetaResponseGenerator
   */
  static generateFull<resultType>(
    value: resultType,
    responseCode: ResponseCode) {
    const instance = new MetaResponse();
    instance.value = value;
    instance.addResponseCode(responseCode)
  }

  /**
   *
   *
   * @static
   * @template resultType
   * @param {resultType} value
   * @param {ResponseCode} responseCode
   * @returns {MetaResponse<resultType>}
   * @memberof MetaResponseGenerator
   */
  static generateByResponseCode<resultType>(
    value: resultType,
    responseCode: ResponseCode,
  ): MetaResponse<resultType> {
    const instance = new MetaResponse<resultType>();
    instance.value = value;
    instance.addResponseCode(responseCode);
    return instance;
  }

  /**
   *
   *
   * @static
   * @template resultType
   * @param {ResponseCode} responseCode
   * @returns {MetaResponse<resultType>}
   * @memberof MetaResponseGenerator
   */
  static generateAnErrorResponse<resultType>(
    responseCode: ResponseCode,
  ): MetaResponse<resultType> {
    return this.generateByResponseCode(null, responseCode);
  }
  
  /**
   *
   *
   * @static
   * @template resultType
   * @param {HttpStatus} httpStatus
   * @param {*} error
   * @returns
   * @memberof MetaResponseGenerator
   */
  static generateErrorByStatus<resultType>(httpStatus: HttpStatus, error: any) {
    return this.generateByResponseCode(null, new ResponseCode(httpStatus, undefined, undefined, undefined, undefined, error));
  }
}
