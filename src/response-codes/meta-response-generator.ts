import { MetaResponse } from './meta-response';
import { ResponseCode } from './response-code';
export class MetaResponseGenerator {
  static generateFull<resultType>(
    value: resultType,
    responseCode: ResponseCode,
    responseCodes: ResponseCode[],
  ) {
    const instance = new MetaResponse();
    instance.value = value;
    instance.mainResponseCode = responseCode;
    instance.responseCodes = responseCodes;
  }

  static generateByResponseCode<resultType>(
    value: resultType,
    responseCode: ResponseCode,
  ): MetaResponse<resultType> {
    const instance = new MetaResponse<resultType>();
    instance.value = value;
    instance.mainResponseCode = responseCode;
    instance.responseCodes = new Array<ResponseCode>(responseCode);
    return instance;
  }

  static generateAnErrorResponse<resultType>(
    responseCode: ResponseCode,
  ): MetaResponse<resultType> {
    return this.generateByResponseCode(null, responseCode);
  }
}
