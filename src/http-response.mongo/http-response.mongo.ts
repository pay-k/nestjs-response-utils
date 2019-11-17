import { MongoErrorCodes } from './mongo-codes.enums';
import { Expose } from 'class-transformer';

export class HttpResponseForMongoErrors {
  @Expose()
  public constrain: string;

  @Expose()
  public constrainDescription: string;
  /**
   * Creates an instance of http response for mongo errors.
   * @param mongoErrorCode
   * @param mongoErrorDescription
   * Determine by the Mongo error that is the constrain
   */
  constructor(mongoErrorCode: number, mongoErrorDescription: string) {
    switch (mongoErrorCode) {
      case MongoErrorCodes.Duplicate:
        this.constrain = 'code';
        this.constrainDescription = mongoErrorDescription;
        break;
      default:
        this.constrain = 'General error';
        break;
    }
  }
}
