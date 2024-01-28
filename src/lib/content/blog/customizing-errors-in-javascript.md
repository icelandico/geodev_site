---
templateKey: blog-post
title: Customizing Errors in JavaScript
slug: customizing errors in javascript
date: 2023-06-03T17:01:01.543Z
category: JavaScript
tag:
  - javascript
---
Error handling is a critical aspect of software development, enabling developers to identify and resolve issues efficiently. JavaScript provides the Error class as a foundation for creating and customizing error objects, allowing developers to create tailored error messages, add additional information, and handle exceptions effectively. In this article, I would like to shou you how the Error class can be utilized to enhance error handling in JavaScript applications.

In JavaScript, the Error class serves as the base class for all error-related objects, including built-in error types like SyntaxError, ReferenceError, and TypeError. By extending the Error class, we can create their own custom error types that encapsulate specific scenarios or domain-specific errors.

## Creating custom Error types

It's simple. We have to define a new class that extends the `Error` class.

First I like to define available error types so I have an ordered and defined set of Error options:

```typescript
export const ERROR_TYPES = {
  CLIENT: 'CLIENT_ERROR',
  SERVER: 'SERVER_ERROR',
  RUNTIME: 'RUNTIME_ERROR',
} as const;

type EnumValues<T> = T[keyof T];

export type ErrorTypes = EnumValues<typeof ERROR_TYPES>;

export interface IError {
  message: string;
  type: ErrorTypes;
}
```

If my application will require a new error type to handle, I will start defining it from this file. Note that I don't use `enum` . I rather create a POJO to define my reusable set of data. I described it in <a href="https://www.geodev.me/blog/something-about-enums/" target="_blank">one of my previous articles</a>.

Now I create a separate class for my new custom Error:

```typescript
import { ERROR_TYPES, ErrorTypes } from '@errors/types';

class ClientError extends Error {
  name: ErrorTypes;
  constructor(message: any) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }

    this.name = ERROR_TYPES.ClientError ;
    console.error(`${ERROR_TYPES.ClientError } - ${message}`);
  }
}

export default ClientError;
```

In the above example, I extend the Error class and assign a name property to the custom error class, allowing us to identify the specific error type.

Once I have defined my custom error class, we can create instances of it and throw them using the `throw` keyword or return the class instance with `message` and other information we want to include in our error handler. Throwing a custom error enables us to provide meaningful error messages and additional context to aid in debugging.

I like to create couple of `Errors` classes and use them depending on the purpose. To utilize this idea, I create a function to distinguish errors:

```typescript
import ClientError from '@errors/ClientError';
import AuthorizationError from '@errors/AuthorizationError ';
import ServerError from '@errors/ServerError';
import OtherErrorfrom '@errors/OtherError';

export const errorHandler = (error: any, actionType: string) => {
 if (error.response.status === 401) {
     return new AuthorizationError(`${actionType} - ${error.message}`);
 } else if (error.response.status < 500 && error.response.status >= 400) {
     return new ClientError(`${actionType} - ${error.message}`);
 } else if (error.response.status >= 500) {
     return new ServerError(`${actionType} - ${error.message}`);
 } else {
     return new OtherError(`${actionType} - ${error.message}`);
 }
};
```

## Usage

Consider fetching the data. It's a very error-prone operation. If you have a well written and solid architecture for fetching data, it should be easy to implement Error module inside it. Below is a common pattern that I encountered in few applications I was working on.

```typescript
const fetchData = async () => {
    try {
      return await fetchLocationData();
    } catch (err) {
      errorHandler(err, '[fetchLocationData]');
    }
};
```

If the fetching data function (`fetchLocationData`) will return a `400` error, I will receive the following information in the console:

`ERROR: "CLIENT ERROR - [fetchLocationData] - // Rest of message thrown from operation"`

With our error handling module, it's easier to find where the error was thrown or what particular method have thrown it. What's more, we can catch the error and use it in other place of our application. For example while displaying the error to the user, we can include the error details. The end user can report the error to you giving you the information you need - the error code, the message, the name of the method that returned this error.

## Conclusion

The Error class in JavaScript provides a powerful mechanism for customizing and extending error handling capabilities. By creating custom error types, developers can craft error messages tailored to their applications and domain-specific scenarios. Leveraging the Error class empowers developers to improve the reliability and maintainability of their JavaScript code by enhancing error reporting and enabling more effective debugging.