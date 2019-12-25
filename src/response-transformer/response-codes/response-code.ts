import { HttpStatus } from "@nestjs/common";

export class ResponseCode {
  /**
 * Creates an instance of ResponseCode.
 * @param {HttpStatus} httpStatus
 * @param {string} [property=undefined]
 * @param {number} [code=undefined]
 * @param {string} [errorMessage=undefined]
 * @param {string} [pendingMessage=undefined]
 * @param {*} [error=undefined]
 * @memberof ResponseCode
 */
  constructor(
    public httpStatus: HttpStatus,
    public property: string = undefined,
    public code: number = undefined,
    public errorMessage: string = undefined,
    public pendingMessage: string = undefined,
    public error: any = undefined
  ) {
    this.pendingMessage = pendingMessage || errorMessage;
    this.errorMessage = errorMessage || HttpStatus[httpStatus];
    this.code = code || httpStatus;
    this.error = { error };
  }
}
