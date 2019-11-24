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
