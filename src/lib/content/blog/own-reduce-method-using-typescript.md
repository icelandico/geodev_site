---
templateKey: blog-post
title: Own reduce method using Typescript
slug: Own reduce method using Typescript
date: 2022-06-27T19:12:34.689Z
category: Typescript
tag:
  - basics
  - typescript
  - javascript
---


In my <a href="https://michalmuszynski.com/blog/own-higher-order-functions-implementation/" target="_blank">last post</a> I presented my approach to implement my own versions of some higher order functions in JavaScript. I covered three of them and one, a very powerful one was missing.
The<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce">Array.prototype.reduce</a>.

In this short post, I'd like to show you my take on this higher order function using Typescript.

First, let's extend the Array prototype types. That's the part I'm not sure of. The Typescript compiler does not complain, but I feel that's something's wrong here. If you know what, let me know.
```javascript
interface Array<T> {
    myReduce(cb: (previousValue: T, currentValue: T, index: number, array: T[]) => T, initialValue: T): T;
}
```

And the function itself should look like this:

```javascript
Array.prototype.myReduce = function<ReducedElem, ReducedValue>(callback: (previousValue: ReducedValue, currentValue: ReducedElem, index: number, array: ReducedElem[]) => ReducedValue, initialValue: ReducedValue): ReducedValue {
    let i = 0;
    let reduced = initialValue;

    if (arguments.length < 2) {
        i = 1;
        reduced = this[0];
    }
    for (i = 0; i < this.length; i++) {
        reduced = callback(reduced, this[i], i, this)
    }

    return reduced;
}
```

I've tested this solution with a few examples.

```javascript
// Classic usage - sum the numbers in the array
const numbers = [1, 10, 100, 1000];
numbers.myReduce((sum, curr) => sum + curr, 0) // Result: 1111

// Find the most recent date
const dates = [
  '1999/01/01',
  '2022/12/01',
  '2010/05/01',
  '2022/01/01'
];
dates.myReduce((max, curr) => curr > max ? curr : max, dates[0]) // Result: '2022/12/01'

// Flatten an array
const persons = [['Andrew', 'Joe'], ['Margaret', 'Sylvia'], ['Andrew', 'Rebecca', 'Joe', 'Sylvia']];
persons.myReduce((flatArray, currArray) => flatArray.concat(currArray), [])
/* [
      'Andrew', 'Joe', 'Margaret', 'Sylvia', 'Andrew', 'Rebecca', 'Joe', 'Sylvia'
   ]
*/
```



These examples work fine and gave me the expected results. The Typescript compiler is not complaining about these examples as well.
For more information about typing function I recommend to get familiar with a <a href="https://www.typescriptlang.org/docs/handbook/2/functions.html" target="_blank">Functions chapter</a> on the Typescript official site.