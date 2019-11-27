import { Expose, classToPlain, Exclude } from 'class-transformer';
import { ResponseCode } from './response-codes/response-code';
import { MetaResponse } from './response-codes/meta-response';

export class HttpResponsesGenerator<T>{
  @Expose()
  public get message() {
    return this.responseCodes.map((res) =>  { 
      return {
        target: this.target,
        value: this.target[res.property],
        constraints: res.error,
        property: res.property,
    }});
  }

  @Exclude()
  private readonly target: any;

  @Expose()
  public statusCode: number;

  @Expose()
  public error: string;

  @Exclude()
  private readonly responseCodes: ResponseCode[]

  @Exclude()
  private readonly property: string;

  get value() {
    if (!this.property) {
      return null;
    }
    return this.target[this.property];
  }

  public get fullResponse() {
    return classToPlain(this);
  }
  /**
   * Creates an instance of http responses generator.
   * @param statusCode
   * @param error
   * @param target
   * @param [property]
   * @param [technicalError]
   */
  constructor(
    response: MetaResponse<T>,
    request: any
  ) {
  
    this.statusCode = response.mainResponseCode.code
    this.error = response.mainResponseCode.errorMessage;
    this.target = request;
    this.property = response.mainResponseCode.property;
    this.responseCodes = response.responseCodes;
  }
}
