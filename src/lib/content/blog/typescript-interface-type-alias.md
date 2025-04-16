---
category: Typescript
date: 2023-11-19 15:08:49.203000+00:00
description: Discover the differences between `types` and `interfaces` in TypeScript.
  Learn when to use each, their pros and cons, and why `type` might be the better
  option for defining object shapes and enforcing code contracts.
slug: typescript interface type alias
tag:
- javascript
- typescript
templateKey: blog-post
title: Interface vs Type alias
---

Probably the two most popular ways to declare type structures in Typescript. Both `types` and `interfaces` are used to define shapes for objects and provide a way to enforce contracts within your code. Can they be used interchangeably? Is one better than the other? What are the pros and cons of using them? I've chosen a few examples to show that `type` might be a better option.

## Interface describes object only

A type alias is more versatile. You can describe any shape using `type`, for example, union types and functions.
```typescript
type User = {
  name: string;
  address: {
	city: string;
	street: string;
  }
};
type CurrencyCode = 'USD' | 'EUR' | 'CHF';
type VoidFunc = () => void;
```

## Usage with Utility types

Both `type` and `interface` can be used with Utility types (like `Required`, `Partial`, `Pick`). The difference is that usually, it's easier to do it with the first one.
```typescript
type WebsiteConfig = {
  title: string;
  theme: string;
  language: string;
  analyticsEnabled: boolean;
};

type SimpleWebsiteConfig = Omit<WebsiteConfig, "analyticsEnabled">;

// With the interface the syntax is more complicated

interface ISimpleWebsiteConfig extends Omit<WebsiteConfig, "analyticsEnabled"> {}
```
## Extracting type from an object

In some cases, you can define your type based on data. This can be done only with `type`.
```typescript
const character = {
  name: 'Aria Shadowblade',
  age: 300, race: 'Elf',
  occupation: 'Rogue',
  isHero: true,
  abilities: {
	  physical: ['Stealth', 'Dagger Mastery', 'Archery'],
	  mental: ['Telekinesis']
  },
};

type CharacterType = typeof character;
type CharacterAbilities = typeof character.abilities;
```

In the last example, we declared a type `CharacterAbilities` which extracted a part of the type consisting only of `abilities` part. So the type is equal to:
```typescript
type CharacterAbilities = {  
  physical: string[];  
  mental: string[];  
}
```

## Interfaces can be merged (by accident)

If you declare two interfaces with the same name, their declarations will be merged into one. In the below example the declaration of `Product` is merged into one.
```typescript
interface Product {
  name: string;
  price: number;
};

// somewhere else in this scope

interface Product {
  stock: number;
  onSale: boolean;
};

const myProduct = {
  name: 'TV',
  price: 1500,
};
// Error. Type '{ name: string; price: number; }' is missing the following properties from type 'Product': stock, onSale(2739)
```
That's not what we are expecting. The `myProduct` object requires two more properties. 
While using `type` it's not possible to declare two types with the same name. 
```typescript
type Product = {
  name: string;
  price: number;
};

type Product = {
  stock: number;
  onSale: boolean;
};

// Error. Duplicate identifier 'Product'.(2300)
```
## Tuples

That's a rather extreme case. If you need to describe a tuple you should not consider the use of the interface.

```typescript
type PointTuple = [number, number];
interface IPointTuple {
  0: number; 
  1: number;
 };

const point: PointTuple = [10, 20]; // Works
const interfacePoint: IPointTuple; // Works
```

## Conclusion

In most cases, the choice between types and interfaces comes down to personal preference and the specific requirements of your code. The cases I have presented are solely my opinion. I have only outlined what the limitations are when using the interface. Some developers prefer the versatility of types, while others appreciate the readability and extensibility of interfaces. In practice, you might find yourself using a combination of both, depending on the context and your specific use cases.