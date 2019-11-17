import { Expose, classToPlain, Exclude } from 'class-transformer';

export class HttpResponsesGenerator {
  @Expose()
  public get message() {
    return [
      {
        target: this.target,
        value: this.value,
        constraints: this.technicalError,
        property: this.property,
      },
    ];
  }

  @Exclude()
  private readonly target: any;

  @Expose()
  public statusCode: number;

  @Expose()
  public error: string;

  @Exclude()
  private readonly technicalError: any;

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
    statusCode: number,
    error: string,
    target: any,
    property?: string,
    technicalError = { error: 'General error' },
  ) {
    this.statusCode = statusCode;
    this.error = error;
    this.target = target;
    this.technicalError = technicalError;
    this.property = property;
  }
}
