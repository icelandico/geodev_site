---
templateKey: blog-post
title: Pagination component in React
slug: Pagination component in React
date: 2021-04-16T21:02:50.399Z
category: React
tag:
  - components
  - react
---


Last time I presented how to create a <a href="https://michalmuszynski.com/blog/pagination-component-in-angular/" target="_blank">pagination component</a> using Angular. In this post, I'd like to show, how to get the same result using React.

For the purpose of this post I've created a new project with a <a href="https://github.com/icelandico/react-pagination" target="_blank">github repository</a>. The live project is available <a href="https://icelandico.github.io/react-pagination/" target="_blank">here</a>. 
 The project is created using **Create React App** with Typescript. I just run: `npx create-react-app my-app --template typescript` 

Let me remind you what functionalities this component will have:
- change pages by one,
- jump to the next and last page,
- type the desired page number by hand,
- trigger the content change when the page changes.

## Fetching the data

I used the same data as in the *Angular component*. The data is brought to you again by <a href="https://jsonplaceholder.typicode.com/posts" target="_blank">jsonplaceholder</a>. I will focus only on the component itself and its logic. I didn't use any additional packages. I use regular CSS here, native *fetch* API, and pure React.

All posts should be fetched in the parent component for the pagination. In our React application, it is in the main `App` component.

#### `app.tsx`
```javascript
import React, { useEffect, useState } from 'react';
import './app.css';
import DataList from './components/DataList/dataList';
import Pagination from "./components/Pagination/pagination";
import { IPost } from "./components/data.model";

const fetchData = async (url: string): Promise<IPost[]> => {
  const response = await fetch(url);
  return await response.json();
}

const App: React.FC = () => {
  const [data, setData] = useState<IPost[]>([]);
  const [displayedData, setDisplayedData] = useState<IPost[]>([]);
  const itemsPerPage = 10;
  const allPages = Math.ceil(data.length / itemsPerPage);

  const onPageChange = (page: number = 1) => {
    const startItem = (page - 1) * itemsPerPage;
    const endItem = page * itemsPerPage;
    setDisplayedData(data.slice(startItem, endItem))
  }

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    fetchData(url).then(data => setData(data));
    onPageChange()
  }, [data.length])

  return (
    <div className="main__container">
      <h1>Pagination</h1>
      <DataList posts={displayedData} />
      <Pagination allPagesNumber={allPages} itemsPerPage={10} itemsNumber={data.length} pageChange={onPageChange}/>
    </div>
  );
}

export default App;

```

The `fetchData` function is defined outside of the component. It's because it won't be redeclared every time the component rerenders. It's a good idea to create the utility function which fetches the data of the different shape. But for this simple app, I use this function only in this place. So the posts are loaded using the regular `fetch` with `async, await`.
In this component, we have to specify how many items per page we would like to show. Again - the value here is hardcoded but it's possible to make it dynamic.
To fetch the data in React, we have to put the function inside the `useEffect` hook. As a dependency value, I put the `data.length`. This means that this hook will be triggered if the `length` of data will change. Right after the data is fetched, the initial number of posts to display is set in the `onPageChange` function. The same function will handle the action after the page number is changed.

## Display the data

The `DataList` is a dummy component. Which means that it has no state. It only consumes the props and displays the data. 
That's the most wanted kind of component in our React app.

#### `dataList.tsx`
```javascript
import React from 'react';
import { IPost } from './../data.model'

interface IProps {
  posts: IPost[]
}

const DataList: React.FC<IProps> = ({ posts }) => {

  return (
    <div className="list__container">
      <div className="list_data">
        {
          posts.map((item: IPost) => {
            return (
              <p key={item.id}>
                { item.id } - { item.title }
              </p>
            )
          })
        }
      </div>
    </div>
  )
}

export default DataList;
```

## Pagination component

Here's the pagination component.

#### `pagination.tsx`
```javascript
import React, { useEffect, useState} from 'react';
import './styles.css'

interface IProps {
  allPagesNumber: number
  itemsPerPage: number
  itemsNumber: number
  pageChange: (page: number) => void
}

const Pagination: React.FC<IProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    props.pageChange(currentPage)
  }, [currentPage])

  const onFirstPage = (): void => {
    setCurrentPage(1);
  }

  const onLastPage = (): void => {
    setCurrentPage(props.allPagesNumber);
  }

  const onNextPage = (): void => {
    setCurrentPage(currentPage + 1);
  }

  const onPreviousPage = (): void => {
    setCurrentPage(currentPage - 1);
  }

  const validateInput = (value: string) => {
    const regex = /^[0-9\b]+$/
    const regexTest = regex.test(value)
    regexTest && setCurrentPage(parseInt(value, 10))
  }

  return (
    <div className="pagination__container">
      <div
        className={`pagination__button pagination__page-first ${currentPage === 1 ? 'pagination__button--disabled' : ''}`}
        onClick={() => onFirstPage()}
      >
        First
      </div>
      <div
        className={`pagination__button pagination__page-previous ${currentPage === 1 && 'pagination__button--disabled'}`}
        onClick={() => onPreviousPage()}
      >
        Previous
      </div>
      <div className="pagination__page-active">
        <input className="pagination__current-page"
               onChange={(e) => validateInput(e.target.value)}
               value={currentPage}
        />
         /
        <span>{props.allPagesNumber}</span>
      </div>
      <div
        className={`pagination__button pagination__page-next ${currentPage === props.allPagesNumber && 'pagination__button--disabled'}`}
        onClick={() => onNextPage()}
      >
        Next
      </div>
      <div
        className={`pagination__button pagination__page-last ${currentPage === props.allPagesNumber && ' pagination__button--disabled'}`}
        onClick={() => onLastPage()}
      >
        Last
      </div>
    </div>
  )
}

export default Pagination;

```

As in the *Angular* version of this component, for each page changing action, I've created a separate function. Each one changes the only state value, which is `currentPage`. Some buttons need conditional styling, to hide or show them depending on the current page. This is a limitation that will not let the user to select the non-existing page number (too high or too low number).
```javascript
className={`pagination__button pagination__page-first ${currentPage === 1 ? 'pagination__button--disabled' : ''}`}`
```
User can change the page number by typing the value in the input. Here, I added a very simple validation function. The value of the input will change only if the given value is a number. This is where you can put more strict validation conditions.

## Children - Parent communication

It's basic functionality to pass the data from the parent component to a child. Sometimes we need to change the data flow direction. In this example, the parent (*App*) needs information that the current page has changed in the *Pagination* component. We have to pass the function `onPageChange` as a prop:
```javascript
<Pagination allPagesNumber={allPages} itemsPerPage={10} itemsNumber={data.length} pageChange={onPageChange} />
```
In the child component there's a need to use the `useEffect` hook:
```javascript
  useEffect(() => {
    props.pageChange(currentPage)
  }, [currentPage])
```
This will trigger the callback function passed in props from the parent. It will be called every time the `currentPage` value is changed. While using this hook with dependency array, it's very easy to fall into a circular definition or this error: 
`function {functionName} makes the dependencies of useEffect Hook change on every render`. Ensure that the component re-renders only when the needed value is changed.

## Conclusion

In the last two posts, I created the same component using two popular frameworks: Angular and React. Both have a different approaches to the development process. But it's not difficult to get the same result.
