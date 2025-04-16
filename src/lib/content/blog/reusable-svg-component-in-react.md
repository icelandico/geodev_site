---
category: React
date: 2021-01-17 17:34:42.134000+00:00
description: Learn how to efficiently handle SVG elements in React applications. Discover
  best practices for integrating SVG, from inline code to component transformation,
  to enhance your JavaScript projects.
slug: Reusable SVG component in React
tag:
- react
templateKey: blog-post
title: Reusable SVG component in React
---

SVG is one of the image formats you want to use in JavaScript application. The question of why to choose SVG over other image formats is a separate topic to discuss. In this short tutorial, I would like to show how I handle SVG elements in React applications.

React gives us few options to use SVG in components.

You can paste the SVG content inline, in any of your components. This solution is not advised. Your component code will be bloated with the svg code, there's no reusability. The example below is just an example. The SVG code won't give any output if you try to open it. Usually, the SVG files are more complex.
```javascript
import React from 'react';

const User = () => {
  return (
    <div className="user__avatar">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
        <g fill="#61DAFB">
          <path="example svg path..."/>
        </g>
      </svg>
    </div>
  )
};

```
The next option is to transform your svg file directly into a React component. This can be done using SVGR package. I won't explain how it works in detail but here's the snippet that shows how simple it is. After the configuration you just need to include your SVG as a component, the optimization will be handled by SVGR.
```javascript
import React from 'react';
import MyLogo from './myLogo.svg';

const User = () => {
  return (
    <div className="user__avatar">
      <MyLogo />
    </div>
  )
};

```
If your React application is bootstrapped using the `create-react-app` SVGR webpack loader is already included in your configuration.
This should be enough in most cases but I needed to create a generic and reusable container for SVG icons. 
I wanted to avoid styling vector elements in each component and store them in a separate component.

To handle this I created this simple component. Note that I use `styled-components` and `typescript`.
#### `svgIcon.tsx`
```javascript
import React from "react"
import { SvgContainer } from "./svgicon-styles"

interface Props {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  width?: number
  height?: number
}

const SvgIcon: React.FC<Props> = props => {
  const { Icon } = props
  return (
    <SvgContainer {...props}>
      <Icon />
    </SvgContainer>
  )
}

export default SvgIcon
```

And here is the styled component:
#### `svgicon-styles.ts`
```javascript
import styled from "styled-components";

export const SvgContainer = styled.div<{
  height?: number
  width?: number
}>`
  height: "auto";
  width: "auto";
  display: inline-flex;
  align-items: center;
  justify-content: center;

  & svg {
    height: ${props => (props.height ? `${props.height}px` : "100%")};
    width: ${props => (props.width ? `${props.width}px` : "100%")};
  }
`
```
The only thing to make this work is to pass the icon component into `SvgIcon`. Now all SVG's in my project are adjusted to the parent container. If I need to set other dimensions to the icon, I have to pass the appropriate `width` or `height` prop in the desired component. So far I've needed to change only the width and the height using props, but it's easily extendable. Other properties might be added to manipulate the SVG using props.
#### `User.tsx`
```javascript
import React from 'react';
import SvgIcon from "../../shared/SvgIcon/svgIcon";
import { ReactComponent as MyIcon } from "../icons/myIcon.svg";

const User: React.FC = () => {
  return (
    <div className="user__avatar">
      <SvgIcon Icon={MyIcon} width={35} />
    </div>
  )
};
```
Before I add any SVG into the project I optimize its code. For now, I can achieve it using <a href="https://jakearchibald.github.io/svgomg/" target="_blank">this tool</a>. Just paste the SVG code and choose any from the available features. You can minify the code, prettify markup, and optimize the whole SVG file.

## Conclusion

Wrapping the SVG icon into a separate component is helpful when it comes to unifying the appearance of these elements across your application. Using this component along with the SVGR package or other SVG optimization tool will make your icons easily scalable and editable. This may also increase the performance and speed of your website.