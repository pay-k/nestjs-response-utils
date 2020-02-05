<h1 align="center">
@payk/nestjs-response-utils
</h1>
<p align="center">
  <a href="http://nestjs.com"><img src="https://nestjs.com/img/logo_text.svg" width="320" /></a>
</p>

<p align="center">
  Response (& Request) utils for <a href="https://github.com/nestjs/nest">NestJS</a>
  <br /><br />

  [![Build Status](https://dev.azure.com/payk/PayK%20Public/_apis/build/status/pay-k.nestjs-response-utils?branchName=master)](https://dev.azure.com/payk/PayK%20Public/_build/latest?definitionId=12&branchName=master)

## Installation
```
npm install @payk/nestjs-response-utils
```


## What does it do?

## Quick Start
Add a decorator on top of your method or controller
```ts
@UseInterceptors(new LoggingInterceptor(), new TransformResponseInterceptor(ResponseKYCDto))
```

The `LogginInterceptor` can also be added globally according to NestJS documentation.

The `TransformResponseInterceptor` accepts in his ctor the object it's supposed to transform and also a mapping function if the properties are named differently.
<aside class="warning">
It's important to always put the logging interceptor first, as he needs to be the first to run and last to catch errors.
</aside>

## Why & How
Our operation mode is that Dto goes into the controller and then into the service. And the service works with Models (DB Models mainly). The service then returns to the controller the Model and the controller transforms it into a Response DTO. To remove the boilerplate, the service should use a MetaResponse object and the controller the TransformResponseInterceptor that will do the transformation of the MetaResponse<Model> into the ResponseDTO.

The Service gets a RequestDTO and returns a `MetaRespone<Model>` created by the `MetaResponseGenerator` to the controller.

### MetaResponse
Do create a MetaResponse we have a MetaResponseGenerator class.
```ts
// Return an object (Model) and the require ResponseCode (HttpResponse normally)
MetaResponseGenerator.generateByResponseCode(
    dbModel,
    ResponseCodes.OK,
  );

// Return an Error, no object needed.
MetaResponseGenerator.generateAnErrorResponse(
    ResponseCodes.NOT_FOUND,
  );

// Return an HttpStatus error
MetaResponseGenerator.generateErrorByStatus(
  HttpStatus.OK,
  { error: 'object' }
)
```

### ResponseCode
The ResponseCode object assists in returning errors mainly. A few come by default in the `ResponseCodes` class. More can be initiated using the `ResponseCode` ctor

## LoggingInterceptor
The logging interceptor will log the request and response to the service.
### Masking Data
In order to mask data that shouldn't be logged, the `LoggingInterceptor` supports getting an array in his constructor of property names that should be masked.

```ts
new LoggingInterceptors(['propertyName','properyThatShouldBeMasked'])
```
Assuming the following Json:
```ts
{
  name: 'Dan',
  test: 'ing',
  propertyName: 'I'll be masked',
  inner: {
    here: 'there',
    properyThatShouldBeMasked: 123,
    propertyName: 1111999
  }
}
```

Will result in the following:
```ts
{
  name: 'Dan',
  test: 'ing',
  propertyName: '--REDACTED--',
  inner: {
    here: 'there',
    properyThatShouldBeMasked: '--REDACTED--',
    propertyName: '--REDACTED--'
}
```
