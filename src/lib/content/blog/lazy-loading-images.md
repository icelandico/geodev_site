---
templateKey: blog-post
title: Lazy loading images function
slug: Lazy loading images
date: 2024-10-31T22:49:00.000Z
category: JavaScript
tag:
  - basics
  - javascript
  - svelte
---
In today's web-first world, image-heavy websites can significantly impact your users experience. Every millisecond counts (a few seconds could ruin your website's traffic), and loading all images at once can lead to slower page loads, increased bandwidth usage, and frustrated visitors. Enter lazy loading: a basic and smart technique that defers loading images until they're actually needed.

In this short article, I would like to describe the simple function that shows the practical implementation of lazy loading using the Intersection Observer API. This solution is framework agnostic so you can use it in every JavaScript based project.

```typescript
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

export const lazyLoad = (image: HTMLImageElement, src: string) => {
  const onLoaded = () => {
    image.classList.add('loaded');
  };
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
    image.src = src;
      if (image.complete) {
        loaded();
      } else {
	    image.addEventListener('load', onLoaded);
	  }
	}
  }, options);
  
  observer.observe(image);
  
  return {
    destroy() {
	  image.removeEventListener('load', onLoaded);
	}
  };
};
```

### Options

- `root` - the default value will use the viewport as the root element of intersection checking. You can specify the particular element. It should be defined as a selector, for example: `document.querySelector("#topContainer")`,
- `rootMargin` - specify the margin around the root element. This value is a string and can be given in a CSS format, ie. `10px 20px 10px 25px`.
- `threshold` - this value indicates when intersection should be triggered. In my example I used 0.3 which means that intersection callback runs if 30% of the target element is visible.

### Arguments 

This function takes two arguments: `image` - which is a HTML image element and `src` - the source URL of the image.

### Intersection Observer

The main part of the function. Creates a new IntersectionObserver that watches for the image to become visible. When the image intersects with the viewport:
- Sets the image's `src` attribute to start loading,
- Checks if the image is already cached (`image.complete`),
- Either marks it as loaded immediately or waits for the load event.

Here the observer is activated `observer.observe(image);`.

### Cleanup function

The last part is the cleanup. The `destroy` function removes the load event listener to prevent memory leaks. Can be called when the component is destroyed or unmounted.

### Usage in Svelte

Last months I built a few websites using SvelteKit. On a few pages I used this function in the following way shown below. 

```html
<img
  class="w-full h-full aspect-square object-cover image-loading"
  use:lazyLoad={"img-src.png"}
/>
```

The `use:` operator is a Svelte directive. This allows you to call functions with the attached node. In this case the first argument of the `lazyLoad` function is called with the `img` element. Also note that I added the `image-loading` class to the element. This will cause a nice fading-in animation when the image is loaded. The class `loaded` which actually generate the animation is declared in the `lazyLoad` function.

```css
.image-loading {
  opacity: 0;
  transform: translateY(45px);
  transition: transform 0.6s, opacity 0.9s;

  &.loaded {
    opacity: 1;
	transform: translateY(0);
	transition-delay: 0s;
  }
}
```
