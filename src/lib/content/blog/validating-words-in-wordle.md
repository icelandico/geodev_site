---
templateKey: blog-post
title: Validating words in Wordle
slug: validating words in wordle
date: 2022-05-10T19:40:49.451Z
category: JavaScript
tag:
  - javascript
  - basics
---
# Wordle validation function

Ever heard about the <a href="https://www.nytimes.com/games/wordle/index.html">wordle game</a>? It's an easy and pretty addictive word game.
Last time I found a lot of programming-related videos with this game. And I decided to make my own implementation (rather a clone) of it.

The hardest point of making it was to create a simple algorithm that validates the given input and compares it with a target word.
First, I have to mention the rules of the game, so you can have an overview of what this validation may look like.

- User has to guess a 5-letter word,
- There are six tries,
- After each guess, the tiles with letters will change the color according to the validation.

And the validation options are:
- The letter is in the correct spot (position),
- The letter is in the word, but the spot (position) is incorrect,
- The letter is not in the word.

The main difficulty for me was handling the words with multiple same letters. For example __comma__, __gamma__, __brass__, etc.
So for example, if a target word is __young__, and the user typed __groom__, only the first letter __"o"__ should be validated and shown as in the word. The second letter __"o"__ should be validated as not in the word. In this scenario, it's a correct hint for the user that there's only one letter __"o"__ in the target word.

## Solution

```javascript
function getValidationArray(guess: string, target: string): string[] {
    const length = target.length;
    const output = Array.from({ length: length }, (v) => '-');

    for (let i = 0; i < length; i++) {
        if (guess[i] === target[i]) {
            output[i] = 'X';
            target = target.replace(guess[i], '-');
        }

        if (target.includes(guess[i]) && output[i] === '-') {
            output[i] = 'O';
            target = target.replace(guess[i], '-');
        }

    }
    return output;
}
```

The solution above may look clunky or cumbersome. It takes two strings as arguments and outputs the array with characters according to the validation. In my approach, I wanted to have an array with validation, so I could use this array to render the validation component. I will write about my *wordle-clone* in the next article.

```javascript
getValidationArray('karma', 'gamma'); // output ['-', 'X', '-', 'X', 'X']
getValidationArray('guess', 'guess'); // output ['X', 'X', 'X', 'X', 'X']
getValidationArray('boozy', 'jaunt'); // output ['-', '-', '-', '-', '-']
```

I covered this solution with a few tests and seems that it's validating letters correctly.

