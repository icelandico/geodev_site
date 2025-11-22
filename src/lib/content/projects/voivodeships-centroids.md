---
templateKey: work-item
title: Voivodeships centroids
date: 2024-09-28T19:50:00.000Z
created: 2018-01-24T15:07:00.000+02:00
image: /assets/map_centroids.png
description: Spatial analysis showing relation between region centroid and capital city
type: map
---

This map is a part of my simple spatial analysis maps collection.

The centroid is also known as geographical centre. It's the points upon which the shape would balance. It's easy to calculate this point for regular shape like circle or rectangle but it's getting complicated when it comes to determine it for irregular shape. The example is most of administrative division.

Thanks to the GIS software it's much easier. One of the most popular is open source QGis which I use for almost all my GIS related works.
Using built-in geometry tool - Polygon centroid I could easily calculate the coordinates of centroid for each of Poland's voivodeship (first level administrative division in Poland).

Apart from the points, I have determined the line joining the centroid and the province capital. For this step I used Hub Lines tool from a well-developed plugin MMQGIS. Two voivoideships in Poland (Lubuskie and Kujawsko-pomorskie) have regional capital shared between two citites, that's why there are two lines in these two provinces.

Congratulations for the Opolskie voivodeship. Distance between the centroid and the regional capital (Opole) is only 3.2 km.
