---
category: Typescript
date: 2023-07-10 17:38:52.478000+00:00
description: Discover how to use TypeScript's Partial utility type to make all
  properties optional, and learn how to handle nested objects for deeper type transformations.
slug: DeepPartial in Typescript
tag:
  - typescript
  - javascript
templateKey: blog-post
title: DeepPartial in Typescript
---

`Partial` is a very useful utility type in Typescript. It allows you to make all properties of an existing type optional. However, by default, TypeScript's `Partial<T>` only performs a shallow partial type, meaning it makes the top-level properties optional, but it does not recurse into nested properties.

First, here's the working example:

```typescript
interface User {
	name: string;
	age: number;
	role: string;
}

const newUser: Partial<User> = {
	name: 'Josh'
};
// No TS error because all properties from `User` are optional
```

The problem arises when we declare a more complex type that has nested objects.

```typescript
interface User {
	name: string;
	age: number;
	role: string;
	location: {
		country: string;
		countryCode: string;
		street: string;
	};
}

const newUser: Partial<User> = {
	name: 'Josh',
	location: {
		countryCode: 'GB'
	}
};
// Type '{ countryCode: string; }' is missing the following properties from type '{ country: string; countryCode: string; // street: string; }': country, street; ts(2739)
```

Having an object with nested properties, we should declare all properties of `location` to satisfy the compiler. `Partial` does not work here anymore.
To create a deep partial type, which makes all properties throughout the object hierarchy optional, we can define our own `DeepPartial` utility type using recursive conditional types. Here's an example implementation:

```typescript
type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

Breaking down the parts of this:

- `keyof T` obtains all the keys (properties) of type T.
- `T[P]` accesses the type of the property P in T.
- `T[P] extends object ? DeepPartial<T[P]> : T[P]` checks if the property is an object type. If it is, then we recursively apply DeepPartial to that property's type. Otherwise, we use the original type of the property.
- `[P in keyof T]?` makes each property optional by appending a question mark.

Now we can use it receive expected result

```typescript
const deepPartialUser: DeepPartial<User> = {
	name: 'Josh',
	role: 'Admin',
	location: {
		street: 'Elm Street'
	}
};
```

In the above example, `deepPartialUser` has a deep partial type of the User interface. It allows you to omit any property at any level of nesting, making them all optional.
