---
category: CSS
date: 2021-01-31 18:05:20.848000+00:00
description: Master CSS selectors beyond classes for legacy projects. Learn how to
  use child combinators and more to handle unchangeable HTML and dynamically loaded
  elements. Boost your CSS skills today!
slug: Non standard CSS selectors
tag:
- css
- basics
templateKey: blog-post
title: Non standard CSS selectors
---

Most of the time you want to use class selector using CSS. That's the most obvious and recommended approach.
If these selectors are properly combined with for example BEM methodology (or any other methodology), chances are high that your CSS is written in a clear and reusable way. 

However, in long-term projects with legacy code you may find yourself in such situations:
- class names of elements cannot be changed,
- HTML can't be changed,
- elements can't be reorganized,
- elements are loaded dynamically and there's no easy way to add a class name,

The list is open. The point is, that you can encounter situations where the class, type, or id selectors *are not enough*.

This is when the other CSS selectors come into play. The list I present here is subjective.

## Child combinator
`element > child_element`

Selects only elements that are the *direct* children of the first element in the selector.
In this example, only `span` elements that are outside the `ul` will be selected.

```html
<div>
  <span>
    The first level - selected
    <span>
      The second level - selected
    </span>
  </span>
  <ul>
    <li>
      <span>
        Nested inside list
      </span>
    </li>
  </ul>
</div>
```

```css
div > span {
  color: peru;
}
```

## Descendant combinator
`element child_element`

This selector is similar to the previous one. The difference is that this one selects *all* elements nested within the element on the first position in the selector. In this example, all `span` elements are selected, even the one inside the list.

```html
<div>
  <span>
    First level - selected
    <span>
      Second level - selected
    </span>
  </span>
  <ul>
    <li>
      <span>
        Nested inside list
      </span>
    </li>
  </ul>
</div>
```

```css
div span {
  color: peru;
}
```

## Attribute selector
`element[attribute]`

You can select an element with any attribute.
The example below will select all anchors with the google link in `href` attribute.

```css
a[href="https://google.com"] {
  color: peru;
}
```
This is rather not useful. Luckily, the attribute selector has some variants which makes it more powerful and reusable.
You can specify the position of the string inside the attribute.

```css
/* Select input with name that starts with "contact" */
input[name^="contact"] {
  padding: 10px;
}

/* Select input with name that ends with "contact" */
input[name$="contact"] {
  padding: 10px;
}
```
The next variations work similarly but they need a bit more clarification.

```html
<p class="contact contact-name">Example text</p>

<p class="contact-name">Another example text</p>
```

```css
/* Select all paragraphs with class that contains "contact" */
p[class*="contact"] {
  padding: 10px;
}

/* Select all paragraphs that contain a class with the "contact" word and is a whitespace-separated value */
p[class~="contact"] {
  padding: 10px;
}
```
In the example above, the first selector, with the `*` will select both paragraphs. The second selector will select only the first one because it contains the standalone `contact` class.

## Nth child selector
`element:nth-child(n)`

This is very helpful when it comes to handling list elements. You can specify the exact element or some combination. For example, you can select every element that is next to an odd element and so on. Here are some examples:

```html
<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
  <li>Six</li>
</ul>
```

```css
/* Selects second element only */
li:nth-child(2) {
   color: peru;
}

/* Selects every second element starting from the second one */
li:nth-child(2n+2) {
   color: peru;
}

/* Selects every third element */
li:nth-child(3n) {
   color: peru;
}
```

This selector has a variation. You can select elements starting from the *end*.
`element:nth-last-child(n)`

```css
/* Selects the second element only, from the end of the list */
li:nth-last-child(2) {
   color: peru;
}

/* Selects every second element starting from the end */
li:nth-child(2n+2) {
   color: peru;
}

/* Selects every third element starting from the end */
li:nth-child(3n) {
   color: peru;
}
```

## The only child selector
`element:only-child`

This selects the element that is the only child of its parent.

```html
<div>
  <p>The only element</p>
</div>

<div>
  <p>Has sibling</p>
  <p>Has sibling</p>
</div>
```

```css
/* This will select the paragraph in the first div */
div p:only-child {
  color: peru;
}
```

## ***Not*** selector
`element:not(selector)`

This pseudo-class selects the element that *does not* match the selector given in parentheses. Especially useful if you want to select an element in a collection without classes.

```html
<div>
  <p class="bold">
    This is a header
  </p>
  <p class="bold">
    This is the first content
  </p>
  <p class="italic">
    This is a second content
  </p>
</div>
```

```css
/* Select paragraphs that don't have the italic class */
p:not(.italic) {
  color: peru;
}
```

## Conclusion

This list is my personal choice of selectors that I used in different projects and I find them useful only in certain situations. CSS offers many other kinds of selectors. Most of them will make your CSS code more bloated and unclear, but there are situations when the use of these selectors is inevitable. I suggest to visit the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors" target="_blank">MDN docs page</a> with all the available selectors to get to know all available selectors and combinations.