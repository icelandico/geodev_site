---
templateKey: blog-post
title: Using MapTiler SDK to render spatial data
slug: Using MapTiler SDK to render spatial data
date: 2026-01-05T20:05:00.000+01:00
description: Learn how to efficiently render thousands of spatial points using
  MapTiler SDK. A short guide to data preparation and modern web mapping with
  your own dataset.
category: JavaScript
tag:
  - svelte
  - typescript
---
If we want to create a web application that displays spatial data (points, lines, or polygons), we face the challenge of properly and optimally presenting this data in a browser. If we assume we only need to display a map base and a small number of vector elements (the limit is difficult to define), a solution might even be to place a JSON file with additional spatial data (GeoJSON) in the project directory. Then, using libraries like OpenLayers or Leaflet, we can display these elements, style them, and add interactive actions. In this article, I'd like to present how I solved the problem of displaying thousands of points (over 65,000) in my <a href="https://www.geodev.me/projects/place-finder" target="_blank">Place Finder project</a>.

## Short introduction to WebGL

The problem arises when there is a large amount of spatial data (let's say several hundred or more) or the user can edit it. In this case, it's best to use an external service that will significantly simplify this task. 

In this article, I'd like to demonstrate how to display a point cloud in an application using the MapTiler SDK. Both this solution and other service providers (MapBox, Carto, etc.) use similar WebGL (Web Graphics Library) technology.

Instead of rendering each element individually as an HTML element, the application mounts a single `canvas` html element. All the basemap components, such as layers like roads, lakes, borders, and buildings, are drawn on this element. All elements are drawn as pixels within the canvas – this allows for the display of hundreds of thousands of elements without significantly burdening the browser engine. Instead of mounting, for example, 50,000 div elements in the DOM, all map layers are drawn as pixels within this single canvas element. Additionally, depending on the current map zoom level, only a specific range of data is displayed. Typically, the map is divided into squares, with more and more squares appearing as the user zooms in. At higher zoom levels, there's no need to load all the points that are outside the current screen.

## Data preparation

In the MapTiler panel, go to the **Tiles** tab. With the free plan, you can load one dataset. For a hobby project, this is sufficient. You can also add files in the **Data** tab, but there are limitations on the uploaded file size (maximum 10,000 points or a file size of 10 MB). For my needs, this was too small. It's also worth noting that loading data in GeoJSON format opens up other possibilities for data manipulation using the SDK.

Spatial data is usually available in the shapefile format. MapTiler accepts data in the GeoPackage format. Format conversion can be performed in the open-source QGis program. Other way is to find a website which can transform these formats for example <a href="https://mygeodata.cloud/converter/shp-to-geopackage" target=_"blank">here</a>. Therefore, our GeoPackage file should be loaded in the **Tiles** tab in the MapTiler panel. Here, we can also preview our data. It's crucial to generate an API key in the **API Keys** tab. 
In the image below I have highlighted the important options that are needed in this tutorial.

![Map Tiler dashboard](/assets/maptiler_1.png)

## Using SDK

Let's move on to the code and our application. My solution is used in the Svelte application, but the framework doesn't matter. First, install the MapTiler SDK library.

```bash
npm install --save @maptiler/sdk
```

Next, you need to import the CSS styles. This is an important step, as it determines the correct display of the map element and any controllers you might add to the map (zoom buttons, etc.). In my application, I placed this import in the `+layout.svelte` component.

```
import '@maptiler/sdk/dist/maptiler-sdk.css';
```

In the base component we can now place an HTML element in which the map will be loaded.

```html
<div id="map" style="width: 100%; height: 100vh;"></div>
```

The next step is to define the map component using SDK. To do this I created a dedicated store in Svelte, where I placed all the necessary actions for interacting with the map and its elements.

```typescript
import type { FilterSpecification, Map } from '@maptiler/sdk';
import * as maptilersdk from '@maptiler/sdk';

export const mapStore = $state({
	map: null as Map | null,
	setMap() {
		maptilersdk.config.apiKey = PUBLIC_MAPTILER_API;
		const map = new maptilersdk.Map({
			container: 'map',
			style: maptilersdk.MapStyle.BASIC_V2,
			center: [18.1, 52.2],
			zoom: 6
		});

		this.map = map;

		map.on('load', () => {
			if (this.map) {
				this.map.addSource('your-tileset-name', { // name of your tileset
					type: 'vector',
					url: `https://api.maptiler.com/tiles/${PUBLIC_MAPTILER_TILE_ID}/tiles.json`
				});
				this.map.addLayer({
					id: 'points-data',
					type: 'circle',
					source: 'your-tileset-name',
					'source-layer': 'tileset-layer-name', // layer name
					paint: {
						'circle-radius': 4,
						'circle-color': '#204a8c',
						'circle-opacity': 0.8
					}
				});
			}
		});

		map.on('click', 'points-data', function (e) {
			const coordinates = e?.features?.[0].geometry.coordinates?.slice();
			const pointName = e?.features?.[0].properties.name;
			const pointType = e?.features?.[0].properties.rodzaj;
			const popupHTML = `
			<div class="popup-content">
				<h1 class="popup-title">${m.name()}: ${pointName}</h1>
				<h1 class="popup-type">${m.point_type()}: ${pointTypeMapper(pointType)}</h1>
			</div>
			`;

		new maptilersdk.Popup().setLngLat(coordinates).setHTML(popupHTML).addTo(map);
		});
		map.on('mouseenter', 'points-data', function () {
			map.getCanvas().style.cursor = 'pointer';
		});

		map.on('mouseleave', 'points-data', function () {
			map.getCanvas().style.cursor = '';
		});
	},
});

```

There's a lot going on here, so I'll explain the features included step by step.
The `setMap` method is called in the main component when the application is rendered. When using the `mapTilerSdk` object from the library, you must first use the API key generated in the MapTiler user panel (number 2 on screenshot). The second important key is the tileset ID, which is again available from the dashboard on our tileset page. As you can see, the code uses environment variables I've placed in the GitHub repository.

Next, we assign the map settings:

```			
container: 'map', // id of div where the map is loaded
style: maptilersdk.MapStyle.BASIC_V2, // style of basemap, there are more available, you can preview them in MapTiler dashboard,
center: [18.1, 52.2], // initial coordinates of map
zoom: 6 // initial zoom
```

Next, events are defined for the map element. The `load` event loads the tileset we added in the MapTiler dashboard. Make sure to specify the correct tileset and layer names (number 3 and 4 on screenshot). Styles for points can be defined in the `paint` object.

The next step is to define the action for clicking on a single point. Here, you can define the HTML for the popup that will appear over the clicked element. There is an access to data of each point which can be accessed by invoking:
`e?.features?.[0].properties.[property_name]`. Check your layer property keys to get data you want to display. This can be checked in any GIS tool like QGis. You can check it also in the MapTiler dashboard in your Tile settings page. Finally, the last step is to place the popup in the map element. The handlers for the last two events are responsible for changing the cursor style to `pointer`.

I use this `store` in the `layout` component and call the `setMap` function in the `onMount` component's lifecycle function.

```typescript
<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { mapStore } from '$lib/stores/mapStore.svelte';
	import '@maptiler/sdk/dist/maptiler-sdk.css';

	onMount(async () => {
		mapStore.setMap();
	});
</script>

<div id="map" style="width: 100%; height: 100vh;"></div>

```
