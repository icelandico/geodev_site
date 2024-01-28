---
templateKey: blog-post
title: Custom events in JavaScript
slug: Custom events in JavaScript
date: 2021-01-10T15:04:57.611Z
category: JavaScript
tag:
  - basics
  - javascript
---
JavaScript is full of events. They are one of the most important features of this language. There are many already existing, built-in events we can use. The most popular probably are: 
click, mousemove, keyup, change, submit, etc. The full list you can find on MDN <a href="https://developer.mozilla.org/en-US/docs/Web/Events" target="_blank">documentation page</a>.

Events are a good way to interact with elements existing in our application or handle actions performed by users.

However, we can encounter the situation when we want to call a function after a certain block of code is executed. Or trigger one of the built-in events manually. In this article, I would like to show some cases when `Event()` and `CustomEvent()` constructors are useful.

## Creating and dispatching events

Let's consider the following situation. We are changing the input value dynamically, with the script.

#### `index.html`

```html
<input class="form__input" value="" />
<button class="form__change">Change data</button>
```

#### `script.js`

```javascript
const inputEl = document.querySelector('.form__input');
const buttonEl = document.querySelector('.form__change');

inputEl.addEventListener('change', e => {
  console.log('New value', e.target.value);
});

buttonEl.addEventListener('click', () => {
  inputEl.value = 'Example value';
});
```

In this situation, the `change` event *won't* be triggered. We have to trigger it manually. Here, the `Event()` constructor comes in. Creating an event is simple:

`const newEvent = new Event('change');` 

Now we have to dispatch this event on the element:

`inputEl.dispatchEvent(newEvent);`

The string with the event name we put into `Event()` constructor parameter must be the same as the one given in `addEventListener`.
So to trigger the `change` event on the input we need to add these two lines in the proper place in our code.

#### `script.js`

```javascript
buttonEl.addEventListener('click', () => {
  inputEl.value = 'Example value';
  const changeEvent = new Event('change');
  inputEl.dispatchEvent(changeEvent)
});
```
Now, the `change` event will be triggered on the input.
As mentioned above, the names of our events are not limited to names that are already built-in in JavaScript.
This will work as long as we pass the same event name in the `Event()` constructor and `addEventListener`.

```javascript
const myEvent = new Event('myEventName');
inputEl.addEventListener('myEventName', () => {...});
```

## Dispatching events with data

It's not all. Apart from creating, dispatching, and listening for custom events, there is the possibility to add data to the event object. If we want to pass data with the event, we have to use `CustomEvent()` constructor.

#### `modal.html`

```html
<div class="modal">
  <div class="modal-content">
    Modal content...
  </div>

  <button class="modal-close">Close</button>
</div>
```

#### `modal.js`

```javascript
const buttonElement = document.querySelector('.modal-close')
const modal = document.querySelector('.modal');

buttonElement.addEventListener('click', () => modal.dispatchEvent(closeModalEvent))

const userData = {
  name: 'Joe',
  lastName: 'Doe',
  age: 50
};

const closeModalEvent = new CustomEvent('closeModal', {
  bubble: true,
  detail: {
    modalId: 1,
    data: userData
  },
  cancelable: true
});

modal.addEventListener('closeModal', e => console.log(e.detail));
```

In the above example, the detail object will be dispatched after the modal is closed with the button. You can receive the data in other places in your code and handle further actions. 
As you can see I passed two additional properties besides the `detail`. These are:
`bubble` - decides whether the event has to be captured by the parent element. The default value is set to `false`.
`cancelable` - defines if it's possible to cancel the event. The default value is set to `false`.

## Browser compatibility

`CustomEvent()` is available in all major browsers except the Internet Explorer. For this browser you can use a polyfill. It can be found <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent" target="_blank">on MDN</a>.
Basically we haveto use `createEvent` and `initEvent`.

```javascript

var element = document.getElementByClassName('.input');
var customEvent = document.createEvent('Event');
customEvent.initEvent('customEvent');

element.addEventListener('customEvent', function(e) {
  console.log('Event', e)
}, false);

element.dispatchEvent(customEvent);
```

## Custom EventEmitter functionality

At the end of this article, I want to show a simple solution that I use when it comes to handling custom events.
I prefer to make utility functions for functionalities that are used in different places in our code multiple times. To avoid creating new events with the constructor I created an object which can be imported into any desired place in your code.

This code is based on a few custom EventEmitters tutorials I found while looking for a custom EventEmitter.

### `eventEmitter.js`

```javascript
const EventEmitter = {
  events: {},
  dispatch: function(event, data) {
    if (!this.events[event]) return
    this.events[event].forEach(callback => callback(data))
  },
  subscribe: function(event, callback) {
    if (!this.events[event]) this.events[event] = []
    this.events[event].push(callback)
  }
}

module.exports = { EventEmitter }
```

If I want to handle any operation regarding events I just import this object and use its methods.

#### `index.js`

```javascript
import { EventEmitter } from './../utils/eventEmitter.js';

const data = {
  name: 'Andy',
  age: 50
};

const emitChange = data => {
  EventEmitter.dispatch('change', data)
};
```

#### `navigation.js`

```javascript
import { EventEmitter } from './../utils/eventEmitter.js';

EventEmitter.subscribe('change', event => {
  /* perform any action with event data */ 
});
```

## Conclusion

Using custom events allows writing more flexible and reusable code. We can decide what part of the code should be executed and perform all actions in a desired and predictable way.