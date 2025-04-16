---
category: Angular
date: 2021-05-14 21:17:29.813000+00:00
description: Learn how to share data between parent and child components in modern
  web development. Discover techniques for passing data down and handling bidirectional
  communication. Optimize your Angular apps with these best practices.
slug: Parent child communication using Angular
tag:
- angular
templateKey: blog-post
title: Parent child communication using Angular
---

It's very common in modern web development to handle the communication between the nearest components. The most obvious data flow is a parent to child. In this post, I'd like to show how to share the data between such components in both directions.

## Passing data to children

Passing the data down to the children's components is very easy.
First, we need to have a parent component. 

#### `app.component.html`
```html
<p>Item clicked {{ activeElement }}</p>
<div class="box__container">
  <app-box *ngFor="let box of boxCollection"
           [details]="box"
           [isActive]="box.name === activeElement"
  >
  </app-box>
</div>
```

In the parent component, the `app-box` component is rendered with the `ngFor` directive from the collection defined in the component. I created a very simple data set.

```javascript
interface IBox {
  id: number;
  name: string;
}

boxCollection: IBox[] = [
  {
    id: 1,
    name: 'Uruguay'
  },
  {
    id: 2,
    name: 'Mongolia'
  },
  {
    id: 3,
    name: 'Japan'
  },
  {
    id: 4,
    name: 'Moldova'
  },
  {
    id: 5,
    name: 'Rwanda'
  }
];
```

To each of the box components, the object with details is passed using attributes in square brackets. In this example it's` [details]`. Here the `[isActive]` attribute is also passed to the box component, but its usage will be shown later.

All we need right now is to receive these attributes in the Box component, using the `@Input()` decorator.

#### `box.component.ts`
```javascript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {
  @Input() isActive: boolean;
  @Input() details;
}
```

Each `BoxComponent` will receive the appropriate details with this decorator. Now, the data received from the parent can be used in a children's component template. In this example, the name is displayed in the box.

#### `box.component.html`
```html
<div class="box" [ngClass]="isActive && 'box--active'">
  <h1>{{details.name}}</h1>
</div>
```

## Passing data from children to parent

This data flow is less obvious but possible. In this case, we need the `@Output()` decorator. 
Each of the children component will have a button, and we want to pass the details from the box up to the parent.
First, we have to create an `Output` in the box component and add a method to handle the output action.

#### `box.component.ts`
```javascript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {
  @Output() boxIdEmitter = new EventEmitter<string>();
  @Input() isActive: boolean;
  @Input() details;

  handleClick(event: string): void {
    this.boxIdEmitter.emit(event);
  }
```

#### `box.component.html`
```html
<div class="box" [ngClass]="isActive && 'box--active'">
  <h1>{{details.name}}</h1>
  <button class="box__button" (click)="handleClick(details.name)">Make active</button>
</div>
```

The `handleClick` method will be triggered on the button click. This will emit the given value from the children using `EventEmitter`. Here it's represented by the `boxIdEmitter`. Now, this value has to be received in the parent component. We have to add the event binding in the parent's template:

#### `app.component.html`
```html
<app-box *ngFor="let box of boxCollection"
         [details]="box"
         (boxIdEmitter)="handleActiveClick($event)"
         [isActive]="box.name === activeElement"
>
</app-box>
```

Notice the event binding `(boxIdEmitter)="handleActiveClick($event)"` which is the core of the children - parent communication. The event name has to be the same as the `EventEmitter` name in the `BoxComponent`. When an event is received it will be handled by the given method. Here's it's a `handleActiveClick($event)`.
Inside the `app.component.ts` we have to define the method:

```javascript
handleActiveClick(value: string): void {
  this.activeElement = value;
}
```

The `activeElement` component property is changed to the clicked box name. I added also another `@Input()` to the children component here - the `isActive` attribute. It evaluates to boolean and changes the styling in the `BoxComponent` using `ngClass`. 

## Attention!

Use `EventEmitter` only to pass the data **one level up**. It's not recommended to use the `@Output()` when you have to pass the data through nested components, deeper than just one level. To handle such a case, creating a shared service is a much better option.

## Conclusion

This short tutorial shows how we can handle the communication between the parent and children components in both ways. If there are more doubts about this topic, please visit the <a href="https://angular.io/guide/inputs-outputs" target="_blank">official Angular documentation page</a> regarding this subject.