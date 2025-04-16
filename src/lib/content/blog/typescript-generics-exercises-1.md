---
category: Typescript
date: 2024-01-01 10:53:13.475000+00:00
description: Master TypeScript generics with practical exercises. Learn to maintain
  type safety and avoid code duplication. Explore tasks from Typehero and elevate
  your skills.
slug: typescript generics exercises 1
tag:
- javascript
- typescript
templateKey: blog-post
title: Typescript generics exercises part 1.
---

Generics seems to be one of the hardest Typescript concepts. If you've ever found yourself duplicating code or struggling to maintain type safety across various data structures, TypeScript generics might just be the game-changer you've been looking for.
One of the best thing you can do is to **practice by repetition**. Luckily there are tools you can use to elevate your skills in this area. I want to show exercises with my solutions to the tasks you can find on the site [Typehero](https://typehero.dev/). Tasks involve creating a type that takes a certain argument (so you have to use generics) and as a result, a new type is returned. Consider these tasks as a Codewars challenge but with types only.

## Exercise 1

```typescript
// Input:
const cookieInventory = {
  chocolate: 1,
  sugar: 20,
  gingerBread: 10,
  peanutButter: 30,
  snickeDoodle: 73,
};

// Test case:
type TestType = CookieSurveyInput<typeof cookieInventory>;

// Expected output:
type ExpectedType = "chocolate" | "sugar" | "gingerBread" | "peanutButter" | "snickeDoodle";
```

In this exercise we have to extract and return the keys from the object passed to `CookieSurveyInput`. To achieve this I used `Record` utility type and `keyof` type operator.

```typescript
// Solution
type CookieSurveyInput<T extends Record<string, unknown>> = keyof T;
```

This type definition states that `CookieSurveyInput<T>` is a union type consisting of all keys of the input object `T`, where `T` is expected to be an object with string keys. In the provided example, it is applied to the `cookieInventory` object, resulting in a union type representing all the keys of `cookieInventory`. You can test with any other object with different keys and values.

## Exercise 2

```typescript
// Input:
type GiftWrapper = {
  present: unknown;
  from: unknown;
  to: unknown;
};

// Test case:
type TestType = GiftWrapper<'Car', 'Santa', 'Trash'>;

// Expected output:
type ExpectedType = {
  present: 'Car';
  from: 'Santa';
  to: 'Trash';
};
```

Here we have to pass strings to the `GiftWrapper` type, which should be applied as a value for a given key in `ExpectedType` object.

```typescript
// Solution
type GiftWrapper<T, K, V> = {
  present: T;
  from: K;
  to: V;
};

```

The solution defines a generic type `GiftWrapper<T, K, V>` that takes three type parameters `T`, `K`, and `V`. The type parameters `T`, `K`, and `V` are instantiated with the types `'Car'`, `'Santa'`, and `'Trash'` respectively. As a result, the `TestType` is inferred as the result type.

## Exercise 3

```typescript
// Input:
type Address = { address: string; city: string };
type PresentDeliveryList = unknown;

type MixedBehaviorList = {
  john: { behavior: 'good' };
  jimmy: { behavior: 'bad' };
  sara: { behavior: 'good' };
  suzy: { behavior: 'good' };
  chris: { behavior: 'good' };
  penny: { behavior: 'bad' };
};

// Test case:
type TestType = PresentDeliveryList<MixedBehaviorList>;

// Expected output:
type ExpectedType = {
  john: Address;
  jimmy: Address;
  sara: Address;
  suzy: Address;
  chris: Address;
  penny: Address;
};

```

In this exercise we have to take all keys from the existing object but assign different value type. Again, `Record` and `keyof` are helpful. 

```typescript
// Solution:
type PresentDeliveryList<T> = Record<keyof T, Address>;
```

The goal is to transform each property of `T` into a property with the same name but a type of `Address`. `PresentDeliveryList<T>` is a type that takes an object type `T` and transforms each property of `T` into a property with the same name but a type of `Address`. The resulting type has the same keys as `T`, but each value is of type `Address`.