---
templateKey: blog-post
title: JavaScript polyfills
slug: JavaScript polyfills
date: 2021-02-14T15:26:33.295Z
category: JavaScript
tag:
  - javascript
  - basics
---
JavaScript environment is a very dynamic one. New features, properties, or methods come out pretty often. The problem is, that not every JavaScript environment (which is a web browser) keeps up with implementation and handling these changes. As a frontend developer, we often have to deal with the features compatibility and we have to test our solutions across multiple browsers in different (often considered as deprecated) versions. Each of the major browsers also has its own way when it comes to implementing the ECMAScript standards.

## Why support older browsers?

You have to consider what kind of audience your web application will target. You won't be bothering about the Internet Explorer 11 or older Firefox versions if you develop a *greenfield* project, written for example in React or Angular. 
The problem mainly concerns long-term apps with a huge codebase, written and maintained for many years by many developers.
The number of users who still use outdated browsers is still large. This significant number of users means that there is still a need to maintain the functioning of the application also for older platforms, like Internet Explorer 11.

## Transpilers

Luckily, we have some tools that help us to just don't think about this problem. First, and the easier option is to use the **transpilers**. JavaScript transpilers are tools that just take code and transforms it into a version that is more "understandable" than other browser versions. The most popular among the JS family is <a href="https://babeljs.io/" target="_blank">Babel</a>. If you use Webpack or Parcel, chances are good that there is Babel under the hood. Babel takes your modern JS code and transforms it into the older syntax. 

Let's consider this simple example. We want to create a class `User`. Class syntax (which is just a syntactic sugar) was introduced in ES6. It is not supported in some older popular browser versions and Internet Explorer 11. The same goes for another popular property, *arrow functions* which are not supported by IE11. 
```javascript
class User {
  
  constructor(name) {
    this.name = name; 
  }
  
}
```
If we use these features in our code and run it in a browser that does not support it, we will get an error in a console.
> Syntax Error

The code below is the same as above but transpiled by Babel.

```javascript
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var User = function User(name) {
  _classCallCheck(this, User);

  this.name = name;
};
```

The same effect can be achieved using Typescript. Depending on the target we set, code written in Typescript can be transpiled even to an ES3 standard. 

```typescript
class User {
    name: string = "";

    removeUser(userId: number) {
        /* ... remove action */
    }
}
```

The code above written in Typescript is transpiled into vanilla Javascript:

```javascript
var User = /** @class */ (function () {
    function User() {
        this.name = "";
    }
    User.prototype.removeUser = function (userId) {
        /* ... remove action */
    };
    return User;
}());
```

## Polyfills

However, some new language features may not be already included in your transpiler versions. Using **polyfill** is helpful in filling some gaps between browser compatibility in a controlled way.
Basically, in web development, a polyfill is just a code that implements functionality that is not available on a web browser. To provide these features we can write our own versions of these functions which can be used across our web application.

Probably all needed polyfills are already written, tested by community and available for example on <a href="https://developer.mozilla.org/en-US/docs/Glossary/Polyfill" target="_blank">MDN docs</a>.
A good option is to keep all of the polyfills in one place and use them only if you need to. Let's take an Array `flat()` method. It's not supported in IE11.

```javascript
if (!Array.prototype.flat) {
    Array.prototype.flat = function(depth) {
    var flattend = [];
    (function flat(array, depth) {
      for (let el of array) {
        if (Array.isArray(el) && depth > 0) {
          flat(el, depth - 1);
        } else {
          flattend.push(el);
        }
      }
    })(this, Math.floor(depth) || 1);
    return flattend;
  };
}
```
So if there is no appropriate method available on the `Array` prototype, we create our own. Of course, we have to use methods and syntax which is supported by the standard or browser that we want to target.

Some functions are more complicated and few lines of code are just not enough to make it work. `Promise` is not supported by IE11. To use it, there's need to load a <a href="https://github.com/stefanpenner/es6-promise" target="_blank">package:</a>

```html
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.js"></script>
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script> 
```
This solution is good in smaller projects when you need to polyfill only a few methods. You can add new functions if your application grows.

There are polyfill libraries which are constantly updated and maintained by the community and these are the great solution for a larger projects:

* <a href="https://polyfill.io/v3/" target="_blank">Pollyfill.io</a>
* <a href="https://github.com/zloirock/core-js" target="_blank">core.js</a>

## Conclusion

Using transpilers is the most popular way to keep your code running across almost every browser version. If you don't need to load such transpilers like `Babel` or you don't use `Typescript` you can write polyfills to mimic some functionalities.