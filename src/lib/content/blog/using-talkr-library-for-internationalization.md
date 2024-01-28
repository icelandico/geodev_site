---
templateKey: blog-post
title: Using Talkr library for internationalization
slug: Using Talkr library for internationalization
date: 2023-01-14T12:10:33.973Z
category: React
tag:
  - typescript
  - react
---
Recently I returned to one of my older projects - [Gdynia Open Data](https://github.com/icelandico/gdynia-open-data). I've added few more functionalities, including internationalization. I don't expect that this project will be used by anyone other than me but I wanted to refresh my knowledge about the aspect of internationalization in web apps.

So far I've used only one solution - [react-i18next](https://react.i18next.com/). The most popular among the developers, very mature and opinionated. However in this tiny project I wanted to try a new library. I had to translate around 30 phrases. Not much, probably not enough to use any additional tool.

First, I gathered information about the possible solutions and compared the bundle size.

| Library | Minified size [kb] | Minified + Gzipped [kb] |
| --- | --- | --- |
| react-i18next | 23.3 | 7.1 |
| react-intl | 62.9 | 17.8 |
| react-intl-universal | 86.8 | 27.7 |
| linguiJS | - lingui/react - 6.7<br> - lingui/cli - ?<br> - lingui/macro - 274.5 | - 2.5<br> - ?<br> - 81 |
| react-translate-component | 9.6 | 3.5 |
| react-translated | 10  | 3.5 |
| talkr | 2.1 | 0.996 |

All of them have pros and cons, and all of them will do their job. I decided to choose the one that has the smallest bundle size - __talkr__.

It's tiny, but it has some interesting features like:

- zero dependecies
  
- Typescript autocompletions for your translations
  
- gender-adapter translations
  
- react-native support
  
- supports plural rules for translations
  

## Implementation

First, wrap your application entry point - probably it is `App` in a `Talkr` provider.

#### `App.tsx`

```jsx
import React from "react";
import { Talkr } from "talkr";
import en from "../../locales/en_translation.json";
import pl from "../../locales/pl_translation.json";

const App: React.FC = () => {
  return (
    <Talkr languages={{ en, pl }} defaultLanguage="en">
        // Rest of your app
    </Talkr>
  );
};

export default App;
```

Now lets' create the JSON files with translations, the same way you would do it using __react-i18next__.

#### `/src/locales/en_translation.json`

```json
{
  "air temperature": "Air temperature",
  "surface temperature": "Surface temperature",
  "wind direction": "Wind direction",  
}
```

#### `/src/locales/pl_translation.json`

```json
{
  "air temperature": "Temperatura powietrza",
  "surface temperature": "Temperatura powietrza",
  "wind direction": "Kierunek wiatru",  
}
```

These file are imported in the same place that we use `Talkr` provider (`App.tsx` in this example).

That's it. Library is configured and we can use it in any component.

#### `/src/components/WeatherIndicator.tsx`

```jsx
import React from "react";
import { useT } from "talkr";

const WeatherIndicator: React.FC = () => {
  const { T } = useT();
  return (
      <h1>{T("air temperature")</h1>  
  )  
};

export default WeatherIndicator;

```

Other feature that you need if you have multiple languages in your app is the possibility of changing the language. Here's how to do it with __talkr__

#### `/src/LanguageSwitcher/LanguageSwitcher.tsx`

```jsx
import React from "react";
import { useT } from "talkr";

const LanguageSwitcher: React.FC = () => {
  const { setLocale, locale } = useT();

  return (
    <div>
        <p>Current language: {locale}</p>
        <button onClick={() => setLocale("en")}>English</button>
        <button onClick={() => setLocale("pl")}>Polish</button>
    </div>
  );
};

export default LanguageSwitcher;

```

## Typescript autocompletion for translation keys

Like in __react-i18next__ there's a possibility to get the keys from your translation files and use them to type-check while using the `usetT` hook.

First, we have to create a new hook. Create a file `translate.tsx` somewhere in your project.

#### `/src/translate.tsx`

```jsx
import { useT as useTr, Autocomplete, TParams, tr } from "talkr";
import en from "./locales/en.json";

type Key = Autocomplete<typeof en>;

export const useAutocompleteT = () => {
  const { locale, setLocale, languages, defaultLanguage } = useT();
  return {
    setLocale,
    locale,
    T: (key: Key, params?: TParams) =>
      tr({ locale, languages, defaultLanguage }, key, params),
  };
}
```

Now, we have to use this newly created hook instead of the `useT` directly from the library. Your IDE will suggest you the possible keys while using the `T` function.

#### `/src/components/WeatherIndicator.tsx`

```jsx
import React from "react";
import { useAutocompleteT } from "translate";

const WeatherIndicator: React.FC = () => {
  const { T } = useAutocompleteT();
  return (
      <h1>{T("air temperature")</h1>  
  )  
};

export default WeatherIndicator;
```