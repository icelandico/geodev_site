---
category: Mobile
date: 2023-03-12 13:39:26.158000+00:00
description: 'Learn how to fix the "ReferenceError: Property ''Intl'' doesn''t exist"
  in React Native apps. Simple steps to resolve this issue for Android applications
  using React Native 0.60 and above.'
slug: Use Intl object in React Native app
tag:
- android
- react native
templateKey: blog-post
title: Use Intl object in React Native app
---

If you develop an app using React Native you may encounter some errors that you normally won't experience while developeing a web app.

I recently came across one of these:

```
ReferenceError: Property 'Intl' doesn't exist.
```

I used `Intl` object in a few places in my app. And turn out, Android application won't recognize this object. Luckily the solution is simple.

If you use React Native 0.60 >=, go to `app/build.gradle` file.

Find a line:

`def jscFlavor = 'org.webkit:android-jsc:+'` and replace it with:

`def jscFlavor = 'org.webkit:android-jsc-intl:+'`.

Also, make sure that you have implemented `jscFlavor` like this:

```java
dependencies {
  if (enableHermes) {
    ...
  } else {
    implementation jscFlavor
  }
}
```

Run `gradlew clean` and then run your app. The error should go away, and you can use `Intl` now.