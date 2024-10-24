---
templateKey: blog-post
title: Reverse string using Typescript string literals
slug: reverse string typescript string literals
date: 2024-10-08T19:46:00.000Z
category: Typescript
tag:
  - typescript
---
You are given a task: create the type definition that takes a string `S` and recursively reverses it. The result should be a new string type where the given input `S` is in reverse order. This is not something you may do on a daily basis work, but it's a fun thing to do and check lesser known Typescript features.
This was one of the exercises from the <a href="https://typehero.dev/aot-2023" target="_blank">Typehero</a> site. And here's the solution:

```typescript
type Reverse<S extends string> = S extends `${infer First}${infer Rest}`
? `${Reverse<Rest>}${First}`
: "";
```

Let's break it down.
#### 1. Generic Type parameter

```typescript
<S extends string>
```

This means that `S` can be only an extension of string literal types.

#### 2. Conditional Type

```typescript
S extends `${infer First}${infer Rest}` ? ... : ...
```

Here we are splitting the string to the first character and the rest of the string.
`${infer First}${infer Rest}` - using `infer` we're extracting parts of the string. `First` as the name suggests is the first character of the string. `Rest` indicates the remaining part of the string after the first character. The whole condition means that if `S` can be split into `First` and `Rest`, proceed with the `true` branch; otherwise, use the `false` branch (empty string).

#### 3. Recursive case

```typescript
`${Reverse<Rest>}${First}`
```

That's the `true` case from the condition. This part recursively builds the reversed string by moving the first character to the end after reversing the remaining string.

#### 4. Base case

```typescript
: ""
```

If `S` cannot be split further (i.e., it's an empty string), the recursion stops, and an empty string `""` is returned.

Below are some examples of using our solution. You can check it out on the <a href="https://www.typescriptlang.org/play/" target="_blank">Typescript playground.</a>

```typescript
type Reversed1 = Reverse<"TypeScript">; // "tpircSeptyT"
type Reversed2 = Reverse<"Neptune">;    // "enutpeN"
type Reversed3 = Reverse<"Toyota">;     // "atoyoT"
```
