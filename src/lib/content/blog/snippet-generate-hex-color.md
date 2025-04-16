---
category: JavaScript
date: 2024-05-06 19:20:00+00:00
description: Learn how to generate random hexadecimal colors in TypeScript. Understand
  the structure of hex color codes and create vibrant, random colors for your projects.
  Perfect for developers looking to enhance their color generation skills.
slug: snippet generate hex color
tag:
- javascript
- snippet
templateKey: blog-post
title: 'Snippet: Generating random HEX color'
---

In several projects, I had to create functionality related to the generation of a random color. To do it it's good to know how the color in hexadecimal format is composed. Usually it's represented by 3-byte (4 is also possible) number. Each byte represent the red, green and blue parts of the color. Each part of the digit is ranging from 00 to FF.

If the hex has also the fourth byte it represents the alpha channel, useful for defining an opacity. In this example I omitted the 4th byte.

```typescript
function generateHex() {
  const possibleCharacters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  const randomIdx = () =>
	  Math.floor(Math.random() * (possibleCharacters.length - 1));
  
  const colorHex = () =>
    `${possibleCharacters[randomIdx()]}${possibleCharacters[randomIdx()]}`;

  return `#${colorHex()}${colorHex()}${colorHex()}`;
}
```