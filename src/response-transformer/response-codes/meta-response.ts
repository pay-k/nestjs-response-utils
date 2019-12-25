import { ResponseCode } from './response-code';
export class MetaResponse<resultType> {
  value: resultType;
  responseCodes: ResponseCode[] = [];
  /**
   *
   *
   * @readonly
   * @memberof MetaResponse
   */
  public get mainResponseCode() {
    return this.responseCodes.sort((a, b) => b.httpStatus - a.httpStatus)[0];
  }

  /**
   * Add another responsecode
   *
   * @param {ResponseCode} responseCode
   * @memberof MetaResponse
   */
  addResponseCode(responseCode: ResponseCode) {
    this.responseCodes.push(responseCode);
  }
}
