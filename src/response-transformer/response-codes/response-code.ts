import { HttpStatus } from "@nestjs/common";

export class ResponseCode {
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
