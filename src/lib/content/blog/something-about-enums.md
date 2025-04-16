---
category: Typescript
date: 2023-04-20 19:34:30.921000+00:00
description: Learn how to define and use enums in TypeScript for named constants.
  Discover how TypeScript automatically assigns numeric values and generates JavaScript
  objects.
slug: Something about Enums
tag:
- typescript
- javascript
templateKey: blog-post
title: Something about Enums
---

Enums let us to define a set of named constants. It's essentially a set of key-value pairs, where the keys are string or numeric values that represent a set of related constants.

The simpliest example is:

```typescript
enum UserRoles {
    ADMIN,
    USER,
    GUEST
}
```

If we don't set the value, Typescript will automatically add it for you. Each value is assigned a numeric value starting from 0.

```typescript
enum UserRoles {
    ADMIN = 0,
    USER = 1,
    GUEST = 2
}
```

When you define an enum in TypeScript, the TypeScript compiler generates code that defines a JavaScript object with the same name as the enum. The object has properties for each enum member, which are set to the corresponding numeric value. The names of the enum members are not included in the generated JavaScript code. The example above will compile to following JavaScript code:

```typescript
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["ADMIN"] = 0] = "ADMIN";
    UserRoles[UserRoles["USER"] = 1] = "USER";
    UserRoles[UserRoles["GUEST"] = 2] = "GUEST";
})(UserRoles || (UserRoles = {}));
```

Note that the enum definition also defines a reverse mapping, where the numeric value of an enum member can be used to look up its name. So we can access enum values by it's index and get enum keys:

```typescript
const user = UserRoles[1];
console.log('User Roles', user); // "User Roles",  "USER" 
```

To sum up, here's the final shape of our `UserRoles` enum:

```typescript
 console.log(UserRoles);
 // Result:
 {
  "0": "ADMIN",
  "1": "USER",
  "2": "GUEST",
  "ADMIN": 0,
  "USER": 1,
  "GUEST": 2
} 
```

## Caveats

Here is the example which shows that using *enum* might be unpredictable or dangerous:

```typescript
if (UserRoles.Admin) {
    // ...logic
}
```

If we don't set string value to this enum, this code won't be accessible because

`UserRoles.Admin` returns `false`.

Another example shows how weird the enum is interpreted by the Typescript itself.

```typescript
enum UserRoles {
    ADMIN = 'ADMIN,'
    USER = 'USER',
    GUEST = 'GUEST',
}

function getUserRole(role: UserRoles) {
    // ...
}

getUserRole(UserRoles.Admin) // No Error
getUserRole('ADMIN'); // Error!
```

The second function call will throw a TS error:
`Argument of type '"ADMIN"' is not assignable to parameter of type 'UserRoles'.(2345)`

So it's not possible to use a value which is not expressed by the enum itself.

## const enums

That's the enum modifier that won't compile to JavaScript. So `const enum` will exist only in Typescript world.

```typescript
enum UserRoles {
    ADMIN = 'ADMIN,'
    USER = 'USER',
    GUEST = 'GUEST',
}
```

When you use a const enum in your TypeScript code, the compiler replaces all references to the enum with the actual values at compile-time. This means that there is no generated code for the const enum, and it is not included in the compiled JavaScript output. So a const enum member can only be accessed using a string literal. There are few limitations also:

- Const enums can only have constant enum members, and cannot have computed or aliased values.
- Const enums cannot be used in a context where a type is expected, such as in a function signature or type annotation.

However, the <a href="https://www.typescriptlang.org/docs/handbook/enums.html#const-enums">Typescript Handbook</a> will tell you, that you probably don't want to use `const enum`. If the authors of a given technology are telling you that some part of their tool should not be used - probably it's a good idea to stick with that advice.

## What instead of Enum?

Using a <a href="https://en.wikipedia.org/wiki/Plain_old_Java_object">POJO</a> with a Typescript features is a good replacement for `enums`.

```typescript
const USER_ROLES= {
    ADMIN: 'ADMIN',
    USER: 'USER',
    GUEST: 'GUEST',
} as const;

type EnumValues<T> = T[keyof T];

type UserRoles = EnumValues<typeof USER_ROLES>;

function getUserRole(role: UserRoles) {
    // ...
}

getUserRole('ADMIN') // No Error
getUserRole(USER_ROLES.ADMIN) // No Error
```

This requires a few more Typescript lines to extract the keys and values from the `USER_ROLES`. But it gives a expected and natural way to use the predefined object with values.