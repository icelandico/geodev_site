---
templateKey: blog-post
title: Useful regex patterns on frontend
slug: Useful regex patterns on frontend
date: 2023-04-10T11:46:23.923Z
category: JavaScript
tag:
  - javascript
  - basics
---
I'm not good at regular expressions. I know some basic patterns and it's syntax, but I've never explored this topic too thoroughly. As a developer who is focused mostly on the frontend side, I didn't encounter them very often. But I realize how important and crucial it is, especially when it comes to validate things, like forms.

Here's my list of regular expressions that I found useful and I use them on a daily basis to solve quite common problems.

## Validate an email

```regex
/^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/g
```

Very common pattern to check if user types a valid email on login or registration page.

__However__ don't use only regex to validate emails. In more complex application, use multiple methods to check if this email is valid or does it work. You can find more information in this <a href="https://learn.microsoft.com/en-us/dotnet/standard/base-types/how-to-verify-that-strings-are-in-valid-email-format">comprehensive article from .Net documentation</a>.

## Limit username to alphanumeric characters

```regex
/^[A-Z0-9]+$/i
```

If you want to be sure that username consists of only charaters from range `[a-zA-Z]` and numbers, use this one.

## Find inline styles

```regex
/style="[^"]*"/g
```

If you want to get rid of inline styles that's a good point to start with.

## Find plain text in JSX

If you use React or React Native and have to use internationalization library you will find this useful. It's a common mistake to put a plain text in our JSX and forget to replace it with a translation method.

```jsx
// Common situation in your React app
return (
    <div>
        <h2>Button title</h2>
        <button>Click me</button>
    </div>
)
```

In this scenario you want to search your project using this pattern:

```regex
/<.*>[^<>{}]+<\/.*>/gm
```

If I use it on the example above it will return me tags: `h2` and `button` with it's content. It will return also some false positives results, but overall I found this pattern very helpful in removing such mistakes from the code.