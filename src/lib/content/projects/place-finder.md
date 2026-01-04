---
templateKey: work-item
title: Place Finder
date: 2026-01-04T17:09:00.000+01:00
created: 2026-01-04T17:09:00.000+01:00
image: /assets/names-map-pl.png
description: Map application where you can find places in Poland based on what
  beginning or ending they have. Thanks to this, you can see how certain groups
  of place names appear in given regions of the country.
url: https://icelandico.github.io/name-map-pl/
repoUrl: https://github.com/icelandico/name-map-pl
type: code
selfUrl: ""
---
This is the second version of a project I completed several years ago.
The previous application is no longer available due to the new level of service from the spatial data provider I previously used (carto.com). I reviewed the list of available solutions, and my needs are currently met by <a href="https://www.maptiler.com/" target="_blank">MapTiler</a>, where I can host the spatial data necessary for this project for free. In addition to the previous versions I added

The application displays a large portion of towns and cities in Poland (approximately 65,500 points). The search engine allows you to find towns based on how their names begin or end. This allows you to see the location of towns and cities on the map based on their names. For those unfamiliar with toponyms in Poland, I have prepared a set of ready-made search phrases. Compared to the previous version, I've added more points. The following types of locations are available:
- cities,
- villages,
- city districts,
- colonies,
- settlements,
- hamlets

Below are some interesting patterns I noticed using this application. - Towns ending in "jmy," such as Kiekskiejmy, Żytkiejmy, Skaliszkiejmy, are found almost exclusively in the northeastern part of the country.
- Towns ending in "szew" (e.g., Łukaszew, Hruszew) are located exclusively in the center of the country.
- Towns ending in "ów" (e.g., Chrzanów, Rzeszów) are largely located in southern Poland. They also occur in other regions of the country, but their number in the Lesser Poland, Subcarpathian, and Silesian voivodeships is enormous.

These are just a few examples. This application may be a useful research tool for those interested in linguistics or regional history.

Technologies used for the project:
- Svelte
- MapTiler SDK JS
- tailwind
- QGis - data preparation for MapTiler
