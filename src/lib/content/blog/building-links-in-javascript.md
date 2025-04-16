---
category: JavaScript
date: 2023-07-15 19:51:19.061000+00:00
description: Discover how to enhance navigation in your React Native app by creating
  a professional, reusable link generation class. Learn to navigate seamlessly from
  your app to specific website pages like About, Privacy Policy, and Product Listings.
slug: Building links in JavaScript
tag:
- javascript
- react native
templateKey: blog-post
title: Building links in JavaScript
---

In a mobile app that I'm working on there are places that navigates from the app to the website of the company. These links navigates to a different pages like: about page, privacy policy, some product pages or listings. 
In a React Native to open an url we use `Linking`:
```typescript
import React, {useCallback} from 'react';
import { Button, Linking } from 'react-native';

const URL = 'https://google.com';

const LinkComponent = () => {
	const handlePress = useCallback(async () => {
		await Linking.openURL(URL);
	}, [url]);

  return (
    <View>
      <Button url={supportedURL}>Open Supported URL</OpenURLButton>
    </View>
  );
};

```

That's it, we pass raw url as an argument and we are navigated to a web browser with this specific address. This works, however I wanted to make it more professional, reusable and predictable. Rather than passing raw urls I created a class that generates links for specific part of the website.
```typescript
const DIRECT_LINKS = {  
	about: 'about',  
} as const;  
  
type EnumValues<T> = T[keyof T];  
type POSSIBLE_LINKS = EnumValues<typeof DIRECT_LINKS>;  
  
export default class LinkBuilder {  
	private readonly baseLink: string;  
	private itemPage: string = 'item-details';  
	private userPage: string = 'user';  
	private imagePage: string = 'image';  
  
	constructor(baseLink: string) {  
		this.baseLink = baseLink;  
	}  
	  
	public itemPageLink(id: number) {  
		return `${this.baseLink}/${this.itemPage}/${id}`;  
	}  
	  
	public userPageLink(id: number) {  
		return `${this.baseLink}/${this.userPage}/${id}`;  
	}  
	  
	public imagePagelink(id: string) {  
		return `${this.baseLink}/${this.imagePage}/${id}`;  
	}  
	  
	public subpageLink(page: POSSIBLE_LINKS) {  
		return `${this.baseLink}/${page}`;  
	}

}  
  
const LinkBuilderInstance = new LinkBuilder('https://my-website.com')
```

To utilize the LinkBuilder class, create an instance by passing the base URL to the constructor. Then, use the generated instance to call the respective link generation methods based on your app's requirements. The class can be easily extended to include additional link generation methods as needed.
Here are some examples of how it works:
```typescript
console.log('Items', LinkBuilderInstance.itemPageLink(2));
// https://my-website.com/item-details/2
console.log('Images', LinkBuilderInstance.imagePagelink('182bncz001xc'));  
// https://my-website.com/image/182bncz001xc
console.log('Subpage', LinkBuilderInstance.subpageLink('about'));
// https://my-website.com/about
console.log('User', LinkBuilderInstance.userPageLink(819));
// https://my-website.com/user/819
```

Note that for `subpageLink` there is additional guard. We can pass only values from the `POSSIBLE_LINKS` type so we can create a fixed collection of strings that can be passed as an argument here.

This `LinkBuilder` class offers a simplified and flexible approach to links. By centralizing link construction logic and providing consistent APIs, the `LinkBuilder` class streamlines the process of generating links for different pages and subpages.