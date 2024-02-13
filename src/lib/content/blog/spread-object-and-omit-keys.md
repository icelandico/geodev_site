---
templateKey: blog-post
title: Spread object and omit keys
slug: Spread object and omit keys
date: 2023-08-16T15:37:02.628Z
category: JavaScript
tag:
  - javascript
  - es6
---
Lastly I needed to create a shallow copy of an object but omit some keys. To make the code more compact I didn't want to use the `delete` operator. ES6 spread operator allows to do it.

Below is an example original object. I want to copy it but omit the `city` and `country` keys.

```javascript
const user = {
	age: 20,
	name: 'Garry',
	city: 'Copenhagen',
	country: 'Denmark'
};

const { city, country, ...userCopy } = user;

console.log(userCopy);

/**
{
    "age": 20,
    "name": "Garry"
}
**/
```

However, this solution creates new, unused variables (`city` and `country`) with their values:

```
console.log(city) // 'Copenhagen'
console.log(country) // 'Denmark'
```

Ideally we don't want to create any side effects. Here's the solution.

```javascript
function omitKeys(keys, obj) {
    const excluded = new Set(keys);
    return Object.fromEntries(Object.entries(obj).filter(e => !excluded.has(e[0])))
}

console.log(omitKeys(['city, country'], user));
/**
{
    "age": 20,
    "name": "Garry"
}
**/

console.log(city) // city is not defined;
console.log(country) // country is not defined;
```
