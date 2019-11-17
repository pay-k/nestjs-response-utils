import { HttpResponsesGenerator } from '../http-response.generator';
import {
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

/*export declare const Ok: (path?: string | string[]) (responseDetails: HttpResponsesGenerator) => {

};*/

const Ok = (responseDetails: HttpResponsesGenerator) => {
  if (responseDetails.statusCode === 400) {
    throw new BadRequestException(responseDetails.fullResponse);
  }
  if (responseDetails.statusCode === 500) {
    throw new InternalServerErrorException(responseDetails.fullResponse);
  }
};
