---
templateKey: blog-post
title: Pagination component in Angular
slug: Pagination component in Angular
date: 2021-04-02T21:34:47.061Z
category: Angular
tag:
  - angular
  - components
---

Pagination is essential when it comes to displaying a lot of data. Usually, we prefer to divide our content into smaller parts instead of showing for example a long list of entries. There's a lot of libraries that offer fully featured components that are ready to use. I prefer to build my own tools. Mostly because I don't want to load a whole npm package if I need just a few (or one) elements from it. In this tutorial, I'd like to show how to implement a reusable pagination component using Angular.

For the purpose of this post I've created a separate project with a <a href="https://github.com/icelandico/angular-pagination" target="_blank">github repository</a>. The live project is available <a href="https://icelandico.github.io/angular-pagination/" target="_blank">here</a>. The project is created using `ng new your-project-name` command from Angular CLI. Here's what will be created:


![Angular Pagination](/assets/angular_pagination_0.gif)

This component allows to 
- change pages by one,
- jump to the next and last one,
- type the desired page number by hand,
- trigger the content change when the page changes.

## Fetching the data

First, I decided to use external API to get data. For the testing purpose this resource is <a href="https://jsonplaceholder.typicode.com/posts" target="_blank">very reliable</a>.

All posts should be fetched in the parent component for the pagination. In our application, it is in the main `App` component.
Here's the component with the explanation.
#### `app.component.ts`
```javascript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IData {
  useId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  fetchedData: IData[] = [];
  displayedData: IData[] = [];
  itemsPerPage: number = 10;
  allPages: number;

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData(): void {
    const dataConfig$ = this.http.get('https://jsonplaceholder.typicode.com/posts');
    dataConfig$.subscribe((data: any) => {
        this.fetchedData = data;
        this.onPageChange();
        this.allPages = Math.ceil(this.fetchedData.length / this.itemsPerPage);
      }
    );
  }

  onPageChange(page: number = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.displayedData = this.fetchedData.slice(startItem, endItem);
  }
}
```

In the `fetchData` method all posts are loaded using the native Angular `HttpClient` module. Also here, we have to specify how many items per page we would like to show. In this example, I put a hardcoded value, but it's possible to make it dynamic. There's just a need to create a select element so the user can choose the number of items per page.

## Display data

The `onePageChange` method is fired every time it receives the event from the pagination component (child component). I will explain child-parent communication in the further part of the article. This part of the code is responsible for splitting the data collection into smaller parts. The `displayedData` is the part that will be shown in the application. I call this method after fetching the JSON so the data is split just after receiving it.
In the template I pass the `displayedData` into the `data-list` component which is responsible only for displaying the data.

#### `app.component.html`
```html
<div class="main__container">
  <h1>Angular Pagination</h1>
  <app-data-list [postsData]="displayedData"></app-data-list>
  <app-pagination [allPagesNumber]="allPages" (changePage)="onPageChange($event)"></app-pagination>
</div>
```

As mentioned above, the `DataList` component only consumes data and displays the input.
#### `data-list.component.ts`
```javascript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-data-list',
  template: `
    <div class="list__container">
      <div class="list_data">
        <p *ngFor="let item of postsData">
          {{ item.id }} - {{ item.title }}
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent implements OnInit {
  @Input() postsData: any = [];

  ngOnInit(): void {}
}
```

## Pagination handler

Now, let's take a look at the Pagination component.

#### `pagination.component.ts`
```javascript
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() itemsPerPage: number;
  @Input() itemsNumber: number;
  @Input() allPagesNumber: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  private _currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {}

  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  onSetPage(event): void {
    this.currentPage = event.target.value;
  }

  onFirstPage(): void {
    this.currentPage = 1;
  }

  onLastPage(): void {
    this.currentPage = this.allPagesNumber;
  }

  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
}
```

For each page change action I've created a separate method. The most important part of this component is the `currentPage` property which is emitted to the parent `App` component. Also, I've used the `getter` and the `setter` here. Thanks to it, I can call the `currentPage` setter in every page handler method to change the value. Every time the `currentPage` value is changed, the event is emitted to the parent component. That's the purpose of the native Angular `EventEmitter` object. 

The template of the pagination is pretty simple
#### `pagination.component.html`
```html
<div class="pagination__container">
  <div class="pagination__button pagination__page-first"
       [ngClass]="currentPage === 1 && 'pagination__button--disabled'"
       (click)="onFirstPage()"
  >
    First
  </div>
  <div class="pagination__button pagination__page-previous"
       [ngClass]="currentPage === 1 && 'pagination__button--disabled'"
       (click)="onPreviousPage()"
  >
    Previous
  </div>
  <div class="pagination__page-active">
    <input class="pagination__current-page" (input)="onSetPage($event)" [value]="currentPage"> / <span>{{allPagesNumber}}</span>
  </div>
  <div class="pagination__button pagination__page-next"
       [ngClass]="currentPage === allPagesNumber && 'pagination__button--disabled'"
       (click)="onNextPage()"
  >
    Next
  </div>
  <div class="pagination__button pagination__page-last"
       [ngClass]="currentPage === allPagesNumber && 'pagination__button--disabled'"
       (click)="onLastPage()"
  >
    Last
  </div>
</div>
```

Each pagination element needs an appropriate `click` handler and `ngClass`. The `pagination__button--disabled` class is needed to prevent the selection of pages that are out of the paging range. This class only disables the `pointer-events` property. The pagination component allows changing the page by typing the page number manually in the input. It works, however you can type a value that is out of range of the pagination in this example (for example -2, 12). It might be prevented for example with the <a href="https://angular.io/guide/attribute-directives" target="_blank">attribute directive</a>. That's an interesting topic to cover, but in this article, I'll leave it as it is.

## Parent-child communication

The data flow in this direction is crucial for the pagination functionality in this example. In the parent component, we fetch the data and serve it through the nested components. The only information that `App` component needs in this case, is the `currentPage` value.

#### `app.component.html`
```html
<div class="main__container">
  <h1>Angular Pagination</h1>
  <app-data-list [postsData]="displayedData"></app-data-list>
  <app-pagination [allPagesNumber]="allPages" (changePage)="onPageChange($event)"></app-pagination>
</div>
```

The `currentPage` value is stored in `Pagination` component. Here we add a (changePage) Output from the Pagination and assign the `onPageChange` method from the `App` component. So the value from the child component is sent to the parent through the Output which is an `EventEmitter`.

## Conclusion

There are surely many ways to create your own pagination component. The one I've created is simple and might be extended by other functionalities. However, it fulfills its role. Creating such reusable components is also a great opportunity to enhance your skills and learn to create more organized and structured code.