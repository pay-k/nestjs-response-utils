import { HttpCodesNames } from '../http-codes-names.enums';

export class ResponseCode {
  constructor(
    public code: number,
    public errorMessage: string,
    public httpCodeName: HttpCodesNames,
    public pendingMessage: string = null,
    public property: string = null,
  ) {
    this.pendingMessage = pendingMessage || errorMessage;
  }
}
