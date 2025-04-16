---
category: React
date: 2021-03-21 18:30:30.733000+00:00
description: Learn how to capture the current scroll position in React using custom
  hooks. Enhance user interaction in your web applications by leveraging the scroll
  event.
slug: React scroll handler hook
tag:
- react
- gatsby
templateKey: blog-post
title: React scroll handler hook
---

The scroll event is probably one of the most used events on the webpages. Getting the scroll position of the browser might give you a lot of opportunities to handle user interaction in your web application. In this post, I'd like to show you how I use React `hooks` to get the current scroll position on the page. I use this solution for example on my personal <a href="https://michalmuszynski.com" target="_blank">website</a>.

Basically, all is about using the custom hook which adds an event listener and captures the current scroll position.

#### `useScrollHandler.js`
```javascript
import { useState, useEffect } from "react"
const isWindowAvailable = typeof window !== "undefined"

const getPosition = () => isWindowAvailable ? window.pageYOffset : undefined

const useWindowScrollPosition = () => {

  const [scrollPosition, setScrollPosition] = useState(getPosition())

  useEffect(() => {
    if (!isWindowAvailable) {
      return false
    }

    const handleScroll = () => {
      setScrollPosition(getPosition())
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollPosition
}

export default useWindowScrollPosition
```

You can notice the `getPosition` function at the top of the file. It is used in the `useEffect` to check if the window object exists. This is because my website is built using Gatsby. There's a need to check some globals before calling the code because Gatsby website is built using node. In the Node environment, there are no such objects like `window` or `document`, so it will throw an error during the build.

The hook itself is very simple. It returns the current `pageYOffset` property value. Using hooks like this is very handy because we can reuse them in any component in our code. Now, I use this hook only in the Gatsby `layout` component, but If I have to implement it elsewhere - I have the scroll handler already. 
Here's how the implementation looks like:

#### `layout.js`
```javascript
import React from "react"
import useScrollHandler from "../../hooks/useScrollHandler"
// other imports

const isBrowser = typeof window !== `undefined`
const { arrowThreshold } = config

const Layout = ({ location, children, additionalData }) => {
  return (
    <>
      <Helmet>
        // React Helmet tags
      </Helmet>
      <div className="main-container-mask main-container-mask--top"/>
      <div className="main-container-border"/>
      {
        useScrollHandler() > arrowThreshold &&
          <UpArrow />
      }
      <main className="main-container__content">
        <Navigation location={location} />
        {children}
      </main>
      <div className="main-container-mask main-container-mask--bottom"/>
    </>
  )
}

export default Layout
```

All I need to do is to check if the return value of the `useScroll` hook fulfills the condition and the Arrow Up can be rendered. In my case the threshold value is the `arrowThreshold`and it's stored in my config file. 

That's all you need to implement the `useScrollHandler` hook in your application.