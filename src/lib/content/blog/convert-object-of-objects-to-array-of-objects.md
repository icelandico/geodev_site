---
templateKey: blog-post
title: Convert object of objects to array of objects
slug: Convert Object of objects to Array of Objects
date: 2021-07-01T21:04:50.698Z
category: JavaScript
tag:
  - javascript
  - basics
---


In some scenarios, we need data in a different format than we are given, for example from the API response. This is the situation when data transformation comes to play. In this short post, I'd like to show how to transform an object containing other objects, to a more developer-friendly format, like an array of objects.

## Input data

Let's consider the following data collection.
```javascript
const objectOfObjects = {
  1:
    {
      countryName: "Slovakia",
      hasSeaAccess: false,
      isInEU: true
    },
  2:
    {
        countryName: "Belarus",
        hasSeaAccess: false,
        isInEU: false
    },
  3:
    {
      countryName: "Albania",
      hasSeaAccess: true,
      isInEU: false
    },
  4:
    {
      countryName: "Finland",
      hasSeaAccess: true,
      isInEU: true
    },
}
```
This data structure is something I've seen a few times in my (not too long) career. If we want to loop through such a collection and create some components from it, it's much easier to have an array and iterate over it.
The simplest solution is to use `Object.entries()` method over it to convert this structure to an array.
If we use only this method, that's the result:

```javascript
const objectEntries = Object.entries(objectOfObjects)
// The result
[
  ['1', { countryName: 'Slovakia', hasSeaAccess: false, isInEU: true }],
  ['2', { countryName: 'Belarus', hasSeaAccess: false, isInEU: false }],
  ['3', { countryName: 'Albania', hasSeaAccess: true, isInEU: false }],
  ['4', { countryName: 'Finland', hasSeaAccess: true, isInEU: true }]
]

```
Close enough. To convert it only to an array of objects and keep the id we are given we have to use `Array.map()` over it.

```javascript
const arrayOfObjects = Object.entries(objectOfObjects).map(key => ({ ...key[1]}));
// The result
[
  {
    id: '1',
    countryName: 'Slovakia',
    hasSeaAccess: false,
    isInEU: true
  },
  {
    id: '2',
    countryName: 'Belarus',
    hasSeaAccess: false,
    isInEU: false
  },
  {
    id: '3',
    countryName: 'Albania',
    hasSeaAccess: true,
    isInEU: false
  },
  { 
    id: '4',
    countryName: 'Finland',
    hasSeaAccess: true,
    isInEU: true
  }
]
```

That's the desirable result. If you need this to be working on an older browser, like Internet Explorer 11 you have to use this sophisticated <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries#polyfill">polyfill</a> provided by the MDN. Or you can use my solution below.

```javascript
function convertCollection(obj) {
    var keys = Object.keys(obj);
    return keys.map(function(key) {
      return ({ id: key, ...obj[key] })
    })
}
```

This will return the same result as the solution with the `Object.entries()`.
