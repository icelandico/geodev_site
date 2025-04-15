---
templateKey: blog-post
title: Create animations using requestAnimationFrame
slug: animations using request animation frame
date: 2021-06-03T19:24:30.030Z
description: Learn how to create smooth, JavaScript-powered animations using
  requestAnimationFrame for better control and performance.
category: JavaScript
tag:
  - javascript
---
Modern web development often uses animations to interact with the user and enhance the overall user experience.
One option to create an animation is to use CSS (with keyframes). However, sometimes we need to use more sophisticated logic or change the behavior of the particular element using JavaScript.

In this post, I'd like to show how we can utilize the `requestAnimationFrame` method to perform an animation. 

## Using `setInterval`

Animations were created with `setInterval` or `setTimeout` before the `requestAnimationFrame` was introduced. 
To animate any element moving in any direction we have to move it by a certain number of pixels at a certain time. We have to calculate the number of pixels to increase to make it look smooth. 24 frames per second should be enough to achieve this effect. Let's consider the following example:

#### `setIntervalAnimation.html`

```html
<div class="square"></div>

<script>
const element = document.querySelector('.square');
element.addEventListener('click', animate);

function animate() {
  let start = Date.now();

  let timer = setInterval(function() {
    let timePassed = Date.now() - start;

    element.style.left = timePassed / 5 + 'px';

    if (timePassed > 2000) clearInterval(timer);

  }, 20);
}
</script>
```

You can check the working example <a href="https://codepen.io/icelandico/pen/qBrxJEx" target="_blank">on my codepen</a>. The animation is working, and it's pretty smooth but it can be enhanced.

## Using `requestAnimationFrame`

This API was designed to handle more complex animations generated with JavaScript in a more efficient and optimized way.
Using `requestAnimationFrame` is easy. There are only two methods related to it:

* `requestAnimationFrame(callback)` - here we have to specify the callback function which will run in our loop,
* `cancelAnimationFrame(callbackId)` - use this method to stop (cancel) the loop callback.

Here's the simple usage of it. It's a similar example of the animated square as the previous one.

#### `requestAnimationFrame.html`

```html
<div class="square"></div>

<script>
const element = document.querySelector('.square');
const windowDimensions = {
  width: document.body.getBoundingClientRect().width,
  height: 800,
}; 

let animationRequest;
let positionX = windowDimensions.width / 2;
let positionY = windowDimensions.height / 2;
let movementX = 5;
let movementY = 5;

function runAnimation() {
  animationRequest = window.requestAnimationFrame(runAnimation);

  positionY += movementY;
  positionX += movementX;

  if (positionY < 0 || positionY >= windowDimensions.height - element.offsetHeight) {
    movementY = -movementY;
  }

  if (positionX <= 0 || positionX >= windowDimensions.width - element.clientWidth) {
    movementX = -movementX;
  }

  element.style.top = positionY + 'px';
  element.style.left = positionX + 'px';
}

window.requestAnimationFrame(runAnimation);

setTimeout(() => {
  window.cancelAnimationFrame(animationRequest)
}, 5000);

</script>
```

Live demo is available <a href="https://codepen.io/icelandico/pen/VwpyJwY?editors=1111" target="_blank">here</a>. Don't expect an sophisticated animation, it's just a square bouncing around.

## Conclusion

Use this solution to handle more complex and user-friendly animations in your web applications. It's widely supported by browsers, even the Internet Explorer 10.
