import { ResponseCode } from './response-code';
export class MetaResponse<resultType> {
  value: resultType;
  responseCodes: ResponseCode[] = [];

  public get mainResponseCode() {
    return this.responseCodes.sort((a, b) => b.httpStatus - a.httpStatus)[0];
  }

  addResponseCode(responseCode: ResponseCode) {
    this.responseCodes.push(responseCode);
  }
}
