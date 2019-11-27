import { ResponseCode } from './response-code';
import { HttpStatus } from '@nestjs/common';
export class ResponseCodes {
  static readonly OK = new ResponseCode(HttpStatus.OK);

  static readonly BAD_REQUEST = new ResponseCode(
    HttpStatus.BAD_REQUEST,
    'userId',
  );

  static readonly NOT_FOUND = new ResponseCode(
    HttpStatus.NOT_FOUND,
    'userId'
  );

  static readonly GENERAL_ERROR = new ResponseCode(
    HttpStatus.INTERNAL_SERVER_ERROR
  );

  // *********    Examples:   ***********
  //
  // static readonly COUPON_NOT_EXIST_OR_INVALID = new ResponseCode(
  //   4001,
  //   'That offer code is not valid. Please check it has been entered correctly.',
  //   HttpCodesNames.BadRequest,
  // );

  // static readonly COUPON_CAN_USED_ONCE_IN_EACH_GROUP = new ResponseCode(
  //   4002,
  //   'Already used coupon in this group',
  //   HttpCodesNames.BadRequest,
  // );

  // static readonly USER_CAN_USE_EACH_COUPON_ONCE = new ResponseCode(
  //   4004,
  //   'Already paid with this coupon',
  //   HttpCodesNames.BadRequest,
  // );
  // static readonly ONLY_GROUP_ADMIN_CAN_USE_COUPON = new ResponseCode(
  //   4005,
  //   'Only admin allow to use coupon',
  //   HttpCodesNames.BadRequest,
  // );
  // static readonly COUPON_EXPIRED = new ResponseCode(
  //   4006,
  //   'That offer code has expired and is ineligible for redemption.',
  //   HttpCodesNames.BadRequest,
  // );
  // static readonly MAX_REDEEM = new ResponseCode(
  //   4007,
  //   'That offer code has reached its maximum redemption limit.',
  //   HttpCodesNames.BadRequest,
  // );

  

  // static NOT_ENOUGH_NEW_MEMBERS(
  //   numberOfRequiredNewMembers: number,
  //   usersInGroup: number,
  // ): ResponseCode {
  //   return new ResponseCode(
  //     4003,
  //     `To redeem this offer, ${numberOfRequiredNewMembers} new members need to join this group, try again once you’ve had
  //       ${numberOfRequiredNewMembers} friends join.\n\nMembers joined: ${usersInGroup}/${numberOfRequiredNewMembers}`,
  //     HttpCodesNames.BadRequest,
  //     `${usersInGroup} of ${numberOfRequiredNewMembers} members joined your group`,
  //   );
  // }
}
