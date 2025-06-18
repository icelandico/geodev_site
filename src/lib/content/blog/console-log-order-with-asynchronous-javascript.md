---
category: JavaScript
date: 2025-06-18 22:19:00+00:00
description: Refresh your JavaScript skills with a focus on the Event Loop. Learn
  how JavaScript handles asynchronous operations and solve common recruitment problems.
slug: Console Log Order with Asynchronous JavaScript
tag:
  - javascript
  - basics
templateKey: blog-post
title: Console Log Order with Asynchronous JavaScript
---

Once every few months I do a "retest" of my JavaScript knowledge. I review sets of recruitment questions and refresh fundamentals of this language. One of the most important topics that I always review is the **Event Loop**. In short: it's the mechanism that allows JavaScript, despite being single-threaded, to handle asynchronous operations without blocking the main execution thread.

Because of this many of our daily problems are focused on solving the valid order of synchronous and asynchronous operations we have in our programs. That being said examples like this below and similar are quite popular during the recruitment process. At least I had this topic for a few times. I don't want to focus on explaining this problem in detail. It has already been sufficiently described in many articles by people who have much more knowledge and experience than me.

So what's the correct order of logs that will show up in the console?

```javascript
console.log('First');

setTimeout(() => {
	console.log('Second');
}, 0);

new Promise((res) => {
	res('Third');
}).then(console.log);

console.log('Fourth');
```

The answers is:

```
First

Fourth

Third

Second
```

Now the explanation. While one might intuitively expect the output to be "First", "Second", "Third", "Fourth" due to the sequential reading of the code, JavaScript's asynchronous nature dictates a different order. The `setTimeout` with a 0ms delay and the `Promise.then` callback are not executed immediately after they are encountered. Instead, they are placed into different queues and processed by the event loop at specific times.
First `console.log` is a synchronous operation and is pushed on the top of the Call stack and immediately executed.

`setTimeout` is an asynchronous Web API and these operations will execute after the synchronous top-level functions. It's scheduled to be placed in the **Callback Queue (Macrotask Queue)** after the timer expires (which is almost immediately, but still after the current synchronous execution finishes).

`Promise` is a part of **Microtask Queue**. These are handled with higher priority than Macrotasks. Once the current synchronous code finishes and the promise is resolved (which it already is), we will get the 'Third' logged in the console.

The last line with `console.log` is another synchronous operation. It's immediately pushed onto the **Call Stack** and executed.

To sum up, the general order of operations is:

1. **Run all synchronous code on the Call Stack.**
2. **Drain the entire Microtask Queue.** (`Promise`, `MutationObserver`)
3. **Take one task from the Macrotask Queue and execute it.** (`setTimeout`, `setInterval`)
4. **Repeat from step 1.**
