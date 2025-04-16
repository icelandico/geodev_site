---
category: JavaScript
date: 2024-11-02 14:40:00+00:00
description: Learn how to remove duplicates from an array of objects in TypeScript.
  Discover three efficient functions using generics for type safety. Perfect for cleaning
  user input, API responses, and maintaining unique values. Ideal for developers seeking
  practical solutions.
slug: Ways to remove duplicates from array
tag:
- javascript
- basics
- typescript
templateKey: blog-post
title: Ways to remove duplicates from array
---

While working on the code recently, I had a simple problem to solve - remove duplicates from an array of objects. It's a common task that every developer encounters. Whether you're cleaning up user input, processing API responses, or just trying to maintain a unique set of values, having a solid grasp of such techniques is essential. I want to present three functions that will help you with it. The only drawback of this solution is the data input. It won't work if you want to filter objects by keys which are deeply nested.

All of my functions takes two parameters: `list` and `key` - the property by which you want to get unique values. Also I use Typescript generics to ensure type safety and make this functions reusable.

Here's the array I will be using in every example:
```typescript
const list  = [
  { name: 'John' },
  { name: 'Barry' },
  { name: 'Sara' },
  { name: 'Sara' },
  { name: 'Lynn' },
  { name: 'Jake' },
  { name: 'Barry' },
];
```

### `Set`

```typescript
const filterDuplicates = <T, K extends keyof T>(list: T[], key: K) => {
  return Array.from(new Set(list.map(item => item[key]))).map(value => 
    list.find(obj => obj[key] === value)
  );
};
```

Explanation:
- `list.map(item => item[key])` - Gets an array of just the values for the specified key,
- `new Set()` - Creates a Set to remove duplicates of those values,
- `Array.from()` - Converts the Set back to an array,
- `.map(value => list.find(...))` - For each unique value, finds the first matching object from the original list.
  
### `Array.reduce`

```typescript
const filterDuplicates = <T, K extends keyof T>(list: T[], key: K) => {
  return list.reduce<T[]>((prev, current) => {
    const foundElement = prev.find(item => item[key] === current[key]);
    if (!foundElement) {
      return prev.concat([current]);
    } else {
      return prev;
    }
  }, []);
};
```

Here I used `reduce` higher order function to build a new array, with:
- Initial value: empty array `[]`,
- For each item (`current`):
	- Checks if an object with same key value already exists in accumulated array (`prev`),
	- If no duplicate found: adds current item using `concat`,
	- If duplicate found: keeps existing array unchanged.

The main advantage of this approach over the Set version is it's more explicit and gives you more control over the deduplication logic. You could easily modify it to keep the last occurrence instead of the first, or add more complex comparison logic.

### `Array.filter`

```typescript
const filterByKey = <T, K extends keyof T>(list: T[], key: K) => {
  return list.filter((element, idx, arr) => arr.findIndex(item => item[key] === element[key]) === idx);
};
```

This function does two operations:
- The core filtering logic checks each element, and compares two numbers:
	- `idx`: Current position in the array
	- `findIndex`: Position of first element with same key value
This way, only the first occurrence of each unique key value remains in the final array.