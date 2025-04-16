---
category: Typescript
date: 2022-06-19 17:41:49.728000+00:00
description: Discover how to implement higher-order functions in TypeScript. Learn
  to create custom versions of built-in functions, enhancing your JavaScript skills.
  Explore the use of TypeScript generics for reusable and type-safe code.
slug: Own higher order functions implementation
tag:
- javascript
- basics
- typescript
templateKey: blog-post
title: Own higher order functions implementation using TypeScript
---

JavaScript is mostly about functions. We can:
1) assign them to variables,
2) use as arguments to other functions,
3) return a function from a function.

 _Higher order function_ is a function that applies to point **2** or **3**.
 In this post, I'd like to show how I implemented my own versions of some built-in language higher order functions using TypeScript.
 I did not cover __Array.prototype.reduce__ in this post. Hopefully, I will implement this soon.

 ## Interface

 First, I create an interface to set a structure for my methods implementation. Notice that I use <a href="https://www.typescriptlang.org/docs/handbook/2/generics.html#handbook-content" target="_blank">typescript generics</a> here. An array can consist of items of different types and generics are a good solution for such situations. Thanks to it we make this implementation more reusable. We won't lose the information about the passed array type also.

 ```javascript
 interface Array<T> {
    myForeach(cb: (element: T, index: number, arr: T[]) => void): undefined;
    myFilter(cb: (element: T, index: number, arr: T[]) => boolean): T[];
    myMap(cb: (element: T, index: number, arr: T[]) => T): T[];
}
 ```

 ## ForEach

 Let's start with __Array.prototype.forEach__. This method executes a callback once for each element in the provided array.
 Here's my version of it. Notice that returned value is __undefined__ since this method does not return an array, like the other higher order functions we know from JavaScript.

 ```javascript
 Array.prototype.myForeach = function<Each>(callback: (element: Each, index: number, arr: Each[]) => void): undefined {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
    return undefined
}
 ```

 ## Map
 
 Here we need to set the type for the returned (__ChangedMapElem__) array, not only the passed one.

 ```javascript
 Array.prototype.myMap = function<MapElem, ChangedMapElem>(callback: (element: MapElem, index: number, arr: MapElem[]) => ChangedMapElem): ChangedMapElem[] {
    let mapped = [];
    for (let i = 0; i < this.length; i++) {
        mapped.push(callback(this[i], i, this))
    }

    return mapped;
}
```

 ## Filter

 ```javascript
 Array.prototype.myFilter = function<FilterElem>(callback: (element: FilterElem, index: number, arr: FilterElem[]) => boolean): FilterElem[] {
    let filtered = [];
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) filtered.push(this[i]);
    }

    return filtered;
}
```

That's it. I made it just for practice, to solidify my JavaScript/TypeScript skills. I don't encourage you to use your own implementations of methods that are already built into the language. These are well optimized and opinionated so let's stick to language base principles and tools.