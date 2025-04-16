---
templateKey: blog-post
title: Handling big integers in JavaScript
slug: big integers in javascript
date: 2022-03-24 11:18:43.330000+00:00
description: Refresh your coding skills with Codewars katas! Learn how to handle
  large number multiplication in JavaScript, avoiding common pitfalls like
  exponential notation. Dive into the 4 kyu kata challenge and master
  string-based arithmetic.
category: JavaScript
tag:
  - javascript
  - basics
---
As a part of my training and to refresh myself on certain topics, I recently returned to solving katas from <a href="https://codewars.com">codewars</a>. After few easy ones I jumped to 4 kyu <a href="https://www.codewars.com/kata/55911ef14065454c75000062">kata</a> with the following instruction:

```
Multiply two numbers! Simple!

- The arguments are passed as strings.
- The numbers may be way very large
- Answer should be returned as a string
- The returned "number" should not start with zeros e.g. 0123 is invalid
```

Sounds pretty easy, right? My first attempt looked like this:

```javascript
function multiply(a, b) {
    const paramA = parseFloat(a.toLocaleString());
    const paramB = parseFloat(b.toLocaleString());
    return (paramA * paramB).toString()
}
```

Unfortunately, the result was given with an exponential. So besides the decimal number I got '2.8308690771532805e+48'. That was not the solution I was (and the kata tests ;-)) looking for.

Here I found that `BigInt` might be helpful in this case. It's a primitive wrapper object introduced in ES2020. Keep in mind that it's quite a new feature, and it won't be available in newer browser versions.

That's the solution for this task:

```javascript
function multiply(a, b) {
    return (BigInt(a) * BigInt(b)).toString();
}
```

That's it. Thanks to `BigInt` wrapper it's possible to represent every number which cannot be handler by the `number` primitive.

Here's an example of how it works in the wild.

```javascript
const regularBigNumber = 98172784239189284787326419872394817239487126349871263948716234;
const bigNumberWrapped = BigInt(regularBigNumber);

console.log(regularBigNumber) // Output: 9.817278423918929e+61
console.log(bigNumberWrapper) // Output: 98172784239189284787326419872394817239487126349871263948716234
```

It handles different formats of numbers, like hex, octal or binary. We can pass a number as a string - it will be converted as well.

That was the first time I needed to use `BigInt` and probably I won't have many chances to use it in the future ;-). 
In my opinion, however, it's important to know even less known features or obscure functionalities of the programming language in which we work every day.

For more details I suggest to read <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt">the MDN documentation</a>
