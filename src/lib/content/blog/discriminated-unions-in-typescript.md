---
templateKey: blog-post
title: Discriminated unions in Typescript
slug: Discriminated unions in Typescript
date: 2023-07-08T17:50:19.562Z
category: Typescript
tag:
  - typescript
  - basics
---
Discriminated unions, also known as tagged unions or algebraic data types, are a feature in TypeScript that enable developers to model and work with varying types of data in a concise and type-safe manner. They provide a way to define a type that can represent multiple alternatives, where each alternative has a unique discriminant property to differentiate it from the others. This discriminant property acts as a type guard, allowing the TypeScript compiler to narrow down the type and provide more accurate type inference.

By using discriminated unions, developers can create expressive and self-describing types that accurately capture the possible states or variants of a value. This is particularly useful when dealing with scenarios such as handling different response types from API calls, representing different error conditions, or modeling complex data structures with varying shapes.

I would like to show how we can implement such types. I had a chance to implement it while working on a API architecture in one of my side-projects.
So we have an API response that might have two results: success and error (rejected state). Both response have some common fields, but they also differ.
If a request succeed we will receive a `data` in some kind of shape. If a request fails we will receive an error message.
First, let's type the generic API response:

```typescript
type SuccessResponse<T> = { status: 'success', data: T, time: Date };
type ErrorResponse = { status: 'error', message: string, time: Date };
type RequestResponse<T> = SuccessResponse<T> | ErrorResponse;
```

I used generic here to describe the `data` if we have a success request. Now let's create a mock response for each of the states.
At the top of the file I created a type for the specific data we're requesting.

```typescript


type ResponseType = {
  users: string[];
  total: number;
};

const successResponse: RequestResponse<ResponseType> = {
  status: 'success',
  data: {
    users: ['Mark', 'Sophie', 'Pavel'],
    total: 3,
  },
  time: new Date(),
}

const errorResponse: RequestResponse<ResponseType> = {
  status: 'error',
  message: 'Comprehensive error message',
  time: new Date(),
}
```

Depending on the `status` property, the appropriate branch of the conditional statement is executed, providing a clear and concise way to handle different response types.
Using discriminated unions in this scenario allows us to effectively handle different API response types with type safety and readability.