---
templateKey: blog-post
title: How to use the infer keyword in Typescript
slug: How to use the infer keyword in Typescript
date: 2025-10-20T20:09:00.000+02:00
description: infer is used exclusively within conditional types to extract a
  type from another type. It allows you to introduce a type variable that can be
  inferred (determined) by TypeScript's type checker during the conditional type
  evaluation.
category: Typescript
tag:
  - typescript
---
It's quite a rare part of Typescript and regular user won't encounter this during daily work. However it's useful part of the language and I would like to show you how you can use this functionality in your code.

`infer` is used exclusively within **conditional types** to **extract** a type from another type. It allows you to introduce a type variable that can be _inferred_ (determined) by TypeScript's type checker during the conditional type evaluation. You should use `infer` primarily to destructure or deconstruct complex types into their constituent parts. This enables you to work with those individual parts to create new, more flexible, and reusable utility types. 
If you have had contact with Typescript so far but mainly used simple types while declaring variables or interfaces - this topic may seem advanced and unclear (it was also mysterious for me).

Let's move on to examples.

### Extracting the Element type from an array

```typescript
type ArrayElement<T> = T extends (infer E)[] ? E : T;

type Numbers = ArrayElement<number[]>; // 'number'
type StringElements = ArrayElement<string[]>; // 'string'
type NonArray = ArrayElement<boolean>; // 'boolean'
```

What's the logic here? `ArrayElement` checks if `T` is an array. If it is, `infer E` extracts the element type into a new type variable `E`, which is then returned. Otherwise, it returns `T`.

### Extracting the Return type of a function

This example shows how to redo a `ReturnType` which is already a part of a language. Rewriting this functionality will help you to understand how `infer` works.

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

const add = (a: number, b: number) => a + b;
type AddResult = GetReturnType<typeof add>; // 'number'

type VoidFuncResult = GetReturnType<() => void>; // 'void'
type NotFunc = GetReturnType<string>; // 'never'
```

Created type checks if T is a function that takes any arguments `(...args: any[])` and returns any value. If it matches, infer `R` captures the return type, which is then returned.

### Extracting the Resolved Type from a Promise (Awaited)

The next example is also a custom implementation of existing language functionality. Here's the simplified version of `Awaited`. Here I used `PromiseLike<T>` which is an interface that represents any object that has a `then` method.

```typescript
type UnwrapPromise<T> = T extends PromiseLike<infer U> 
    ? UnwrapPromise<U>
    : T;

type SimplePromise = UnwrapPromise<Promise<number>>; // 'number'
type NestedPromise = UnwrapPromise<Promise<Promise<string>>>; // 'string'
type RegularType = UnwrapPromise<boolean>; // 'boolean'
```

This solution checks if `T` is a `Promise`. If it is, `infer U` captures the resolved type. It then recursively calls `UnwrapPromise<U>` to handle nested promises (e.g., `Promise<Promise<number>>`). If not a `Promise`, it returns T.

The examples I provided should meet most needs in everyday TS work. I have seen much more advanced examples of this use in various projects, but it mainly concerned local libraries development.
