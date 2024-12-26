---
templateKey: blog-post
title: "Typescript: Conditional types "
slug: typescript conditional types
date: 2024-12-26T14:50:00.000Z
category: Typescript
tag:
  - typescript
  - javascript
---
Writing conditions in our code is one of the most utilized functionalities of the programming languages we are writing in. Even though I've been using Typescript for several years now I did not realize that it allows me to write conditional types. I find it one of the most unique features of the Typescript so far.

For some use cases in our code we cannot declare the particular type yet (like `string` or `number`). This is a situation where conditional types comes in handy.
Thanks to this feature we can write instructions like:
```
Declare the type T which is dependent on type K (or other types as well). If K equals to string, declare type A, otherwise declare type B.
```

This can be represented with this __naive__ examples:
```typescript
// 1.
type CheckType<T> = T extends string ? 'is string' : 'not string';

type ResultType1 = CheckType<'type'>; // 'is string'
type ResultType2 = CheckType<101>; // 'not string'

// 2.
type IsTypeString<T> = T extends string ? true : false;

type Check1 = IsTypeString<'mike'>; // true
type Check2 = IsTypeString<222>; // false
```

We can break down these examples into steps:
1) `CheckType` type is declared with a generic `T`. This part answers the question: "Is the T type a subtype of a string?",
2) If yes, then the type will be `is string` (exact string value) or `true`, otherwise choose the second option from the ternary.

As you can see in the examples above the syntax of the condition is the same as the regular JavaScript ternary operators. They can be nested as well.

Let's go a step further. There is a difference in how Typescript distribute union types. Below are two similar ways to declare a type for an array.
```typescript
// Type union
type ToArray<T> = T[];

type A_1 = ToArray<number>;
type B_1 = ToArray<string | number>; // (number | string)[]

const firstArray: B = [1,2,3, "2"];

// Conditional type
type ToArraySecond<T> = T extends unknown ? T[] : T[];

type A_2 = ToArraySecond<number>;
type B_2 = ToArraySecond<string | number>; // number[] | string[] (!)

const secondArray: B_1 = [1,2,3, "2"] // Ts error
```

If we use conditional type in the second example, Typescript creates two different branches of possible types. 

Conditional types is not something you come across often. I find it to be another useful tool to solve our daily problems when writing code.
