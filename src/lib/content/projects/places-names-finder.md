---
templateKey: work-item
title: Places Names Finder
image: /assets/places_names_finder.png
description: >
  See how the places in Poland are distributed in terms of nomenclature. Search
  by suffix, prefix and whole phrases.
url: https://icelandico.github.io/places-names-finder/
repoUrl: https://github.com/icelandico/places-names-finder
type: code
---
As a cartography enthusiast, I was wondering how places in Poland are distributed taking into account the name of the place. While I was studying different maps over the years and reading articles I noticed some differences in places names distribution.
I was looking for a tool to search the places by its endings and beginnings (prefixes, suffixes). I didn't find one so I decided to create my own. 

This simple application allows searching the places by their name. There are over 56 000 points in the database. Points are downloaded from the Polish Office of Geodesy and Cartography resources and processed. I removed some types of places which wouldn't have much impact on results like city districts and village parts. Every country has its own administration and settlement system so I don't want to be specific on this topic. 

Tools used in this project: Angular, CartoJS. 

__Update 29/04/2021__ - I've added the second layer - rivers. Now it's possible to search the phrases for both layers. Also, there was a need to change the site design.
