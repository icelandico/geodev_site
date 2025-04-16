---
templateKey: blog-post
slug: Styling child component from parent in Angular
published: false
title: Styling child component from parent in Angular
date: 2021-03-01T20:13:54.848Z
description: Learn how to style Angular child components from a parent using
  ::ng-deep and ViewEncapsulation, with practical examples and best practices.
category: Angular
tag:
  - angular
  - css
---
Angular provides a modular design that encourages the developer to create separate components with its own logic and styles. This approach has many advantages, but it can cause some problems to solve. In this post, I'd like to show how to solve a problem with styling inheritance in Angular.

## The problem

Let's create few components and apply styles to them.

#### `parent.template.html`

```html
<div class="parent__container">
  <app-child></app-child>
</div>
```

### `parent.component.css`

```css
.parent__container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: peru;
  width: 300px;
  height: 300px;
}
```

### `child.template.html`

```html
<div class="child__container"></div>
```

### `child.component.css`

```css
.child__container {
  background-color: green;
  width: 150px;
  height: 150px;
}
```

This is how it looks. A Very simple markup and the result.

![green square](/assets/angular_encapsulation_1.png)

Now, imagine the situation where we want to style the child component basing on the action in the parent. A new css class is added to the parent component, and based on this class we want to change the styling of the container that's inside it.

### `parent.component.css`

```css
.parent__container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: peru;
  width: 300px;
  height: 300px;
}

.parent__container.alert .child__container {
  background-color: darkred;
}
```

The inner `div` should change the `background-color` property to `darkred` now. But it does not. If we inspect the elements with the developer tools we notice that styles to the `child__container` class are not applied.

![code snippet](/assets/angular_encapsulation_2.png)

## The solution

This is when the `encapsulation` of the property comes in. By default, all Angular components styles are encapsulated. This means that they apply **only** to the component itself. If we try to style the css classes that are outside the component, they won't be applied. 

The simplest solution for this problem is to set the `encapsulation` property to `ViewEncapsulation.None` in the component.

### `parent.component.ts`

```javascript
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ParentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

Now the styles are no more encapsulated and the result of our manipulation is exactly what we wanted:

![dark red square](/assets/angular_encapsulation_3..png)

However, this solution has a serious downside. The styles from the `parent` component crossed component boundaries and are global now. If there are more elements with the same classes, the styles will be applied to these elements. This may cause unexpected behavior and we should use this solution carefully.

## Using `::ng-deep`

Luckily, there's a better solution to this problem. Angular provides the `::ng-deep` pseudo-class. Using it will disable the encapsulation for **that particular** rule. If we use any selector with this pseudo-class, it will become a global style. But, compared to the previous solution, only the selector and its descendants will be applied in the global scope. 
Here's how to use it in our example:

### `parent.component.css`

```css
::ng-deep .parent__container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: peru;
  width: 300px;
  height: 300px;
}

.parent__container.alert .child__container {
  background-color: darkred;
}
```

That's it. The `::ng-deep` selector will target every element inside the `parent__container` element. Using it along with the BEM css class naming convention in your project should be enough to prevent the styles "leaking" from the outside of the component. 

The last solution in our case is to put the styles to `styles.css` file in the `src` directory of the Angular project.

## Conslusion

It is possible to spread css styles outside of the Angular component. However, it may cause some unexpected styling issues so try to reduce the usage of this approach. If there's a need to apply styles for the descendant elements, use the `::ng-deep` pseudo-class.
