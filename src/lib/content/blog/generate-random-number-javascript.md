---
templateKey: blog-post
title: "Snippet: Generate number with JavaScript random"
slug: generate random number javascript
date: 2024-02-17T21:48:41.935Z
category: JavaScript
tag:
  - snippet
  - javascript
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
