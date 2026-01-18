---
templateKey: blog-post
title: Filtering data within MapTiler layers
slug: Filtering data within MapTiler layers
date: 2026-01-18T16:15:00.000+01:00
description: "Filtering spatial datasets in your application using MapTiler SDK. "
category: JavaScript
tag:
  - javascript
---
If your application displays spatial data, it's highly likely that you want to manipulate it in some way. For example, filter it. In this post, I'll show you how I solved the filtering problem using the MapTiler SDK. The solution presented here is used in the application I wrote about recently – <a href="https://geodev.me/projects/place-finder" target="_blank">Place Finder</a>. Here, you can search for places in Poland based on how their names begin or end.

To apply a filter to a data collection, use the `setFilter` method provided by the `map` object. In my application, it looks like this:

```javascript

map.addLayer({
	id: 'points-data',
	type: 'circle',
	source: 'points_source_name',
	'source-layer': 'source_layer_shp',
	paint: {
		'circle-radius': 4,
		'circle-color': '#204a8c',
		'circle-opacity': 0.8
	}
});
```

After adding the layer to the map, our points will appear in the map element. Filtering is simple and can be accomplished using the function mentioned earlier.

```javascript
map.setFilter('points-data', yourFilter);
```

The second argument is important. The documentation states that the argument should be of type `filter?: FilterSpecification | null | undefined`. At this point, you should familiarize yourself with the data filtering method proposed by <a href="https://docs.maptiler.com/gl-style-specification/expressions/">MapTiler SDK</a>. It seems complicated and ambiguous. In my application, I needed filtering according to three rules:
a) searching for a given phrase anywhere in the string (free search).
b) names starting with the given phrase,
c) names ending with the given phrase.

#### search everywhere

Let's start with the first option. This filter basically matches features whose name contains a value (case-insensitive).

```
[
	'all',
	['has', 'name'],
	['>=', ['index-of', ['downcase', value], ['downcase', ['get', 'name']]], 0]
]
```

The first parameter - `all` indicates that all subsequent conditions must be `true`. The second parameter `['has', 'name']` defines that filtering is performed on the `name` field of the given data collection. The last parameter is a substring check. Values are converted to lowercase. `index-of` is a function looking for a match in a substring. Operator `>=` and `0` means that input value might be contained everywhere in the string.

#### starting with

```
[
	'all',
	['has', 'name'],
	['==', ['index-of', ['downcase', value], ['downcase', ['get', 'name']]], 0]
]
```

The difference is in the third parameter. Here `index-of` expects that the `name` value will start with the given value at position `0`. So it matches features whose `name` **starts with** `value`.

#### ends with

```
[
	'all',
	['>=', ['index-of', ['downcase', value], ['downcase', ['get', 'name']]], 0],
	['>=', ['length', ['get', 'name']], ['length', value]],
	[
		'==',
		['index-of', ['downcase', value], ['downcase', ['get', 'name']]],
		['-', ['length', ['get', 'name']], ['length', value]]
	]
]
```

This is the most complicated filter. This one uses three conditions, all of which must be true.
First, it checks that the feature’s `name` contains the searched `value` at all (case-insensitive), so features with no match are immediately excluded.  
Second, it ensures that the `name` string is at least as long as the searched `value`, which avoids invalid or impossible suffix comparisons.  
Third, it verifies that the position where `value` appears in `name` is exactly at the end of the string by comparing the match index with the length of `name` minus the length of `value`; if these are equal, the `name` truly ends with `value`.

That's it. To use any of these filters we have to pass this array as a second parameter in `setFilter` function as mentioned earlier:

```javascript
map.setFilter('points-data', yourFilterArray;
```
