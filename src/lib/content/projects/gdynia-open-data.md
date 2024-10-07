---
templateKey: work-item
title: Gdynia Open Data
date: 2023-07-10T20:14:00.000Z
image: /assets/gdynia_open_data.png
description: Data viewer for public data of the city of Gdynia
url: https://icelandico.github.io/gdynia-open-data/
repoUrl: https://github.com/icelandico/gdynia-open-data
type: code
---
Last years, more and more data provided by public administration is easily available on the web. The city of Gdynia have a website with open data that covers different categories of city management like public transport, education or health service.

Some of the datasets are in geojson format which mean that they can be shown on a map. What's more, the data is available through API, so there's no need to host the data on other place.

I found a few valuable layers to show on the map:

* public parking places
* weather conditions
* traffic
* air quality data \[Added on 06/01/2023]
* p﻿ublic transport data (stops location, delay information) \[Added on 10/01/2023]
* cameras data [Added on 03/02/2023]

This simple app is made with React, Leaflet and Talkr for internationalization.
