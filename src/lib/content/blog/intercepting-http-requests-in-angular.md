---
category: Angular
date: 2021-07-18 18:42:56.885000+00:00
description: Learn how Angular's HttpInterceptor can standardize varied HTTP responses
  in your app. Discover how to intercept and modify requests/responses using HttpClient.
  Improve your app's data handling today!
slug: Intercepting Http requests in Angular
tag:
- angular
templateKey: blog-post
title: Intercepting Http requests in Angular
---

In a perfect world, we have a standardized HTTP request and responses structure, which is applied in a whole app. A perfect world does not exist and often we have to handle multiple different responses from different sources which structure varies. Luckily, Angular provides a solution to solve this problem on the client side. 

## Creating the interceptor

Angular provides an *HttpInterceptor* interface which helps us to intercept responses using *HttpClient*. Using it, we can modify the response or request, before it will be handled and consumed by the *HttpClient*. First, let's consume and display some data from <a href="https://jsonplaceholder.typicode.com/users">json placeholder</a>.

#### `app.component.ts`
```javascript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Http Interceptor</h1>

      <h2>Regular response:</h2>
      <pre *ngFor="let user of users" [innerHTML]="user | json"></pre>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public users: any = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get('https://jsonplaceholder.typicode.com/users').subscribe(resp => this.users = resp);
  }
}

```

That gives us the example response:

```
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```
To show how to use the interceptor, we will transform the data and add another key to this object. The code below shows the basic interceptor that transforms the response and adds a key to each element in the *users* array.

#### `http.interceptor.ts`
```javascript
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse && event.body) {
            return event.clone({ body: event.body.map(user => ({ ...user, customId: `${user.id}-${user.username}` }))});
        }
      }));
  }
}

```

To make it work we have to modify the `app.module.ts`.

#### `app.module.ts`
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpResponseInterceptor } from './http.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Now it's ready to work. After the data fetching and transformation in the interceptor, the example user will look like this:

```
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  },
  "customId": "1-Bret" // New key with a value added in interceptor
}
```

## Conclusion

In this example, I presented a simple way to transform a data fetched using the *HttpClient* Angular class. It's possible to
implement much more complicated and sophisticated features, like error handling or adding default data to every *post* request. 
Working app with the code is available <a href="https://github.com/icelandico/post-angular-http-incerceptor">in this repo</a>.
If you are interested in the detailed information about *http interceptor* I suggest to visit the official <a href="https://angular.io/guide/http#intercepting-requests-and-responses">Angular docs website</a>.