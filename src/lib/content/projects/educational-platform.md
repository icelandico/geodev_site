---
templateKey: work-item
title: Educational platform
image: /assets/example.jpeg
description: Search, view and browse through political, economical and
  philosophical ideas through the history. Uses Strapi to manage content. Built
  with React. Work in progress.
url: https://icelandico.github.io/ihcenter/
repoUrl: https://github.com/icelandico/ihcenter
type: code
---
Being interested in history and political geography I develop this project along with my friend who designed the layout of the application.
We have created a database containing short articles about figures, organisations and events related to the development of the economy, philosophy, politics and similar sciences. Articles are related to each other and have representation on the map. The goal is to show how different ideas and currents influenced each other and developed.

Currently only map module is available, but we have few other ideas to present the data in different way. Articles can be filtered by ideas, nationality and year (using timeline at the bottom). 

Recently viewed articles are stored in browser's local storage. You can bookmark each article and easily access them from the lower bookmarks panel.
Work is in progress.

Database is managed using headless CMS - Strapi. 
The front-end part is written in React with Typescript. To manage the state I use mobx-state-tree. 
Leaflet is very useful when it comes to show geospatial data. Currently, there is only one map template available, with 1800's boundaries. Ultimately, the map layer will change depending on the year chosen by the user.

Map shapefile is hosted on MapBox.