---
templateKey: blog-post
title: Type-check react-i18next translation keys
slug: type check translation keys
date: 2023-01-13T18:22:26.831Z
category: Typescript
tag:
  - react
  - typescript
---
So you probably use react-i18next library to handle internationalization in your application. It's a great tool and it provides the good way to solve this common problem. But this post is not about describing the pros and cons of this library.

If you use Typescript in your project you would like to minimize the risk of such innocent bugs like typos, misspellings and all the hassle with looking for other minor bug which is not related with the code logic. This may happen quite often if you use internationalization library.

This pattern in react app is probably very familiar to you:

```
<Header>{t('main.header.welcomeText')}</Header>
```

In more complex applications the translation phrases, built for a long time, may be long and error-prone. The above example may be misspelled and looks like:

```
<Header>{t('main.header.welcometext')}</Header>
```

This will show the key in your app, not the translated phrase, which you store somewhere in a JSON file. It would be great if our IDE suggest us the correct phrase while we put the translation in the code. Here's how to do that. I assume that you have already setup project with configured __react-i18next__.

Create a file in the __src__ directory and put this code below.
#### `src/i18next.d.ts`
```typescript
import 'react-i18next';
import en from './i18n/en.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'en';
        resources: {
            en: typeof en;
            // any other languages you would like to type
        };
    }
}
```

Let's check how does it work. We have a file with translations:
#### `src/i18n/en.json`
```json
{
    "main": {
        "header": {
            "farewellText": "Farewell, User",
            "welcomeText": "Welcome, User"
        }
    }
}
```

Now you IDE will suggest you the correct keys from this file.

![IDE suggestion](/assets/translations-ide.png)

Even if you type the wrong key, you will get prompted and code will not compile.

That was the simplest solution for type-check your translations using __react-i18next__.