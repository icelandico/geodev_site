---
templateKey: blog-post
keywords:
  - javascript
  - programming
  - typescript
title: JavaScript startsWith(), endsWith() String methods
slug: Javascript string methods
date: 2021-01-02T21:44:47.503Z
description: Learn how startsWith() and endsWith() work in JavaScript. Simple examples show how to check if a string begins or ends with certain text, plus IE-friendly tips.
featuredimage: ''
category: JavaScript
tag:
  - es6
  - javascript
---

EcmaScript 2015 implemented these two new string methods.

`startsWith()` checks if a string is starting with given characters.
`endsWith()` check if a string is ending with given characters.
Both methods return a Boolean: `true` or `false`.

The syntax of both is:

```javascript
string.startsWith(searchCharacters, position);
string.endsWith(searchCharacters, length);
```

Let's explain how it works with the first parameter only. Here's how it looks like in action:

```javascript
const cityName = 'New Delhi';
cityName.startsWith('New'); // returns true

const countryName = 'Tajikistan';
countryName.endsWith('stan'); // returns true
```

Be careful because these methods are case sensitive, so this:

```javascript
cityName.startsWith('new');
countryName.endsWith('STAN');
```

returns `false`.

There is an optional, second parameter we can pass, apart from the characters to search in a string.
For `startsWith()` it's a position in a string that determines _at what index_ we want to start searching. Default value is set to `0` . If we want to start checking from the other position, just pass the desired number as the second parameter.
For `endsWith()` the second parameter will set the length of the string. So under the hood, the string will be sliced to the given length first, and then the search will be performed.

```javascript
const cityName = 'Vladivostok';
const countryName = 'Luxembourg';

cityName.startsWith('vostok', 5); // returns true
countryName.endsWith('xem', 5); // returns true
```

These methods are supported by all major modern browsers except Internet Explorer. Even the 'newest' IE11 doesn't support it. Here's how we can recreate the functionality of these methods.

_startsWith()_

```javascript
const cityName = 'Las Vegas';
cityName.indexOf('Las') === 0; // returns true
```

_endsWith()_

```javascript
const countryName = 'Iceland';
const searchPhrase = 'land';
countryName.indexOf(searchPhrase, countryName.length - searchPhrase.length) !== -1; // returns true
```
