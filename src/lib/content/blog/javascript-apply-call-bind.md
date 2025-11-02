---
templateKey: blog-post
title: Javascript ABC methods - apply, bind, call
slug: javascript apply call bind
date: 2025-11-02T19:20:00.000+01:00
description: These three methods are some of the most important and fundamental
  in JavaScript. Controlling the execution context is one the most important
  mechanics in Javascript.
category: JavaScript
tag:
  - basics
  - javascript
---
These are three of one of the most fundamental methods in entire Javascript language.
They are fundamental for a reason -  controlling the execution context (`this`). In modern JS standards we don't encounter them often. This is especially true if we're writing an application using frameworks like React, Angular, or Svelte. Using them, we don't need to use `call`, `apply`, or `bind` because these mechanics are hidden behind the framework's solutions. Every developer should know these functionalities because it demonstrates their good knowledge of the technology they use on a daily basis.

## apply

It invokes a function with specified `this` value and provided arguments. They should be passed in an array.

```typescript
function add(a: number, b: number): number {
	return a + b;
}

add(5, 9) // 14
add.apply(null, 5, 9) // 14
```

This is trivial example. We have to pass `null` as the first argument because the function `add` does not rely on `this`.

```typescript

const array1: string[] = ["A", "B", "C"];
const array2: string[] = ["D", "E", "F"];

Array.prototype.push.apply(array1, array2);

console.log(array1); // Output: [ 'A', 'B', 'C', 'D', 'E', 'F' ]
```

`Array.push` is a method of `array1`. apply lets us use it with array2's elements.

The second example is more advanced. Here we can call another function dynamically with an unknown number of arguments.

```typescript

function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

function calculate(this: void, fn: Function, args: number[]): number {
  return fn.apply(null, args);
}

const result = calculate(sum, [10, 20, 30]);
console.log(result); // 60
```

## bind

This method creates a new function that has its `this` value set to a specific value when called. In the first example I used it for partial function application.

```typescript

function multiply(a: number, b: number): number {
  return a * b;
}

const double = multiply.bind(null, 2);
const multiplyByTen = multiply.bind(null, 10);

console.log(double(5));       // 10
console.log(multiplyByTen(7)); // 70
```

The first function - `double` always takes 2 as the first argument. Next function works the same but multiplying it by 10. So in this example `bind` not only defines the `this` context — it can also preset function arguments, creating reusable specialized functions.

```typescript
class TaskRunner {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  run(): void {
    console.log(`Running task: ${this.name}`);
  }

  schedule(): void {
    setTimeout(this.run, 1000); // 1. "Running task: "
    setTimeout(this.run.bind(this), 2000); // 2. "Running task: Data Sync"
  }
}

const runner = new TaskRunner("Data Sync");
runner.schedule();
```

In the first call (`setTimeout(this.run, 1000))`, the function reference is passed unbound, so when `setTimeout` invokes it, this becomes undefined. In the second call, `this.run.bind(this)` creates a _new function_ permanently tied to the correct instance.

## call

This one is almost identical to `apply` except it accepts arguments individually instead of as an array, and it’s often used to borrow methods or explicitly set `this` when invoking a function.

```typescript
class Logger {
  log(this: unknown, prefix: string, message: string): void {
    console.log(`${prefix}: ${message}`);
  }
}

class Service {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  doWork(): void {
    console.log(`Working on: ${this.name}`);
  }
}

const service = new Service("Backup Service");
const logger = new Logger();

logger.log.call(service, "INFO", `Service started: ${service.name}`);
```

`logger` method is called with Service class context. `Logger.log` expects a this of type Logger, but we can still invoke it with a Service instance.
