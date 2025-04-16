---
category: JavaScript
date: 2024-02-17 21:48:41.935000+00:00
description: Learn how to generate reliable random numbers in JavaScript using `Math.random()`.
  Discover two functions to create random numbers within specific ranges, making your
  code more predictable and effective.
slug: generate random number javascript
tag:
- snippet
- javascript
templateKey: blog-post
title: 'Snippet: Generate a number with JavaScript Math.random()'
---

The `Math.random()` method which generates random number in JavaScript can be considered as unreliable. It returns only a number that's greater than or equal to 0 and less than 1. In most cases that's not what developer wants.

Here are two functions that uses `Math.random()` which helps to generate random numbers in more controllable way.

#### Random numbers in range (including max and min)

```typescript
function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

#### Random numbers in range (min included, max excluded)

```typescript
function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
```