---
category: Gatsby
date: 2021-05-02 20:14:16.460000+00:00
description: Learn how to detect and block outdated browsers using Gatsby. How to improve
  user experience by ensuring compatibility and encouraging updates.
slug: Unsupported browser page in Gatsby
tag:
- gatsby
- javascript
templateKey: blog-post
title: Unsupported browser page in Gatsby
---

It is pretty common nowadays to display a popup or special page if a user is using any of the unsupported browsers by the particular website. The purpose of this is to inform the user that the page may not display properly or he even won't be able to use some/all features on the website. Such information should also make the user stop using an outdated browser.

In this short post, I'd like to show you how to get such a result using Gatsby. This solution is implemented on this website. You can check it by trying to browse my website using Internet Explorer.



## Implementation

There are different approaches when it comes to displaying such information. Some websites only show a popup or modal with a warning, but further use is possible. Big companies use this solution because even in such a situation they want to hold the client somehow, even if the site is lacking some functionalities.
I prefer the radical approach - to completely disable the site, so the user has to download other browser in order to display it. 

In Gatsby, you just need a few steps. I took some inspiration from <a href="https://github.com/gatsbyjs/gatsby/issues/9062#issuecomment-707132413" target="_blank">this issue on Github</a>. First, we have to check somehow what browser used to view the website. Here we can use the <a href="https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#introduction" target="_blank">Gatsby browser API.</a> These are methods we can use to respond to specific events within the browser, for example on the first render of the page. For this specific purpose, I've used a `onInitialClientRender` method.
The method is called only on the first render of the Gatsby App. 

#### `gatsby-browser.js`
```javascript
export const onInitialClientRender = () => {
  const isIeBrowser = !!window.MSCompatibleInfo;
  if (isIeBrowser) {
    window.location.replace('/ie11.html');
  }
}
```

As you can see in the code above, on the initial render this method checks if the browser is an Internet Explorer.
If it is - the browser redirects to the plain `html` file. It's possible to just create such a file and put it into a `public` folder. For this, I used `gatsby-node` API. Code inside this gatsby specific file runs once in the process of building the site. 
#### `gatsby-node.js`
```javascript
exports.onPostBootstrap = () => {
  let iePage = path.resolve("./src/components/Ie11Page/ie11.html")
  let iePublicPath = path.resolve("./public/ie11.html")

  if (fs.existsSync(iePage))
    fs.createReadStream(iePage).pipe(fs.createWriteStream(iePublicPath))
}
```

While the site is building, the specific Internet Explorer 11 page is created in a __public__ folder (from which the whole web app is served) from the other HTML file, which I put into the components folder. It may look silly to create a HTML file from another HTML file. Basically, it's not a good approach to insert any file manually into the public folder. So my page is lying together with other page components and is just building to the public directory.

The last step here is to create a page you want to display on the IE11 browser. 
Now, if the user goes to any part of your page, not only the home page, he will be redirected to the `ie11.html` page.

In the `gatsby-browser` I intentionally put `window.location.replace();` to make sure, that even if a user goes back using the browser history (for example the __back__ button), he will remain on the `ie11.html` page.