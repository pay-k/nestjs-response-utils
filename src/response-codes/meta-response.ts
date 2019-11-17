import { ResponseCode } from './response-code';
export class MetaResponse<resultType> {
  value: resultType;
  mainResponseCode: ResponseCode;
  responseCodes: ResponseCode[];

  setResponseCode(responseCode: ResponseCode) {
    this.mainResponseCode = responseCode;
    this.responseCodes.push(responseCode);
  }
}
