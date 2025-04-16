---
category: React
date: 2021-01-24 17:18:31.121000+00:00
description: Learn how to create a reusable scroll indicator in React using hooks
  and Styled Components. Enhance user experience by highlighting scrollable content.
slug: Scroll indicator component in React
tag:
- react
- components
templateKey: blog-post
title: Scroll indicator component in React
---

Scrolling is probably one of the most used actions handled by website users. Several times I came across a situation in which I did not notice that there is still some content to read and discovered this just by accident. In this short tutorial, I want to show how to create a simple scroll indicator. This element might help to highlight that it is still content to scroll down if the user didn't reach the end of the article or just a container with the text.

I will show how to implement such element using React (hooks) with <a href="https://styled-components.com/" target="_blank">Styled Components</a>.

This is how the final component looks like in action:

![Scroll indicator](/assets/indicator.gif)

 `Scroll Indicator` should be reusable, so it can be injected in any desired place in the code and should work inside any container with content that might be scrollable.

 Here's the code for the component:

#### `scroll-indicator.tsx`

```javascript
import React from "react"
import { useEffect, useState } from "react"
import { Indicator } from "./scroll-indicator-styles"
import { Options } from "./scroll-indicator.model"

interface Props {
  container: HTMLElement
  options?: Options
}

export const ScrollIndicator: React.FC<Props> = props => {
  const { container } = props
  const [isScrollNeeded, setScrollValue] = useState<boolean>(true)
  const [isScrollable, setScrollable] = useState<boolean>(false)

  const handleScroll = (): void => {
    const scrollDiv = container
    const result =
      scrollDiv.scrollTop < scrollDiv.scrollHeight - scrollDiv.clientHeight ||
      scrollDiv.scrollTop === 0

    setScrollValue(result)
  }

  const checkIfScrollable = (el: HTMLElement) => {
    return el && el.scrollHeight > el.offsetHeight
  }

  useEffect(() => {
    setScrollable(checkIfScrollable(container))
    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [container, handleScroll])

  return isScrollable && isScrollNeeded && <Indicator options={props.options} />
}
```

The component takes the `container` prop which is just `HTMLElement`. The second prop, `options` is not required. In the app where I use the indicator, I found only one option that might be passed here. But it's easily extendable so probably in further development I can pass more options to it. 
The core part of this component is inside the `useEffect` hook. First, the container dimensions are calculated to check if the scrollbar is already visible. To check it, there's a need to compare the `scrollHeight` and `offsetHeight` properties values.

Then, the `scroll` event is added to the container. Every time the scroll is fired inside the container, the `handleScroll` function is comparing the actual values of `scrollHeight`, `clientHeight`, and `scrollTop` properties.
If both state values are `true` then the indicator will show up inside the container.

Here's how the indicator styles look like:

#### `scroll-indicator-styles.ts`

```javascript
import styled, { keyframes } from "styled-components"
import { Options } from "./scroll-indicator.model"

const getPosition = (pos: string) => {
  switch (pos) {
    case "right":
      return "95%"
    case "left":
      return "5%"
    default:
      return "50%"
  }
}

const indicatorKeyframes = keyframes`
  0% { bottom: 1.5rem; opacity: 1; }
  50% { bottom: 0.2rem; opacity: 0.2; }
  100% { bottom: 1.5rem; opacity: 1; }
`

export const Indicator = <{ options?: Options }>`
  position: sticky;
  left: ${props => props.options ? getPosition(props.options.position) : getPosition()};
  top: 50%;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
  -webkit-animation: ${indicatorKeyframes} 2s infinite ease-in-out;
  animation: ${indicatorKeyframes} 2s infinite ease-in-out;
  z-index: 10;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid ${props => props.color || colors.lightBrown};
`
```

I use a model with only one property (so far) here, which might be considered overkill in that case. But, as it was mentioned earlier, probably more options will show up in the further development. In the default position, the indicator is centered at the bottom of its container.

If there's a need to set the other position, just pass the appropriate value:
`left` or `right`. This is handled by the `getPosition` function.
The colors here are imported from the separate file where I keep all colors declaration. That helps a lot to keep the styling settings in order.

The last thing is the implementation of the `ScrollIndicator` component. Just place the component inside the container:

#### `text-container.tsx`

```javascript
import React, { useRef } from "react"
import { ScrollIndicator } from "./scroll-indicator/scroll-indicator"

const TextContainer: React.FC = props => {
  const containerRef = useRef(null)

  return (
      <div ref={containerRef}>
        {...very long text here}
        {containerRef.current && <ScrollIndicator container={containerRef.current} />}
      </div>
  )
}
```

That's it. The only thing that is needed here is to check if the parent container is already rendered.

## Conclusion

The scroll indicator helps to draw attention that there's more content to view. The component itself is very easy to implement in every place in your code.