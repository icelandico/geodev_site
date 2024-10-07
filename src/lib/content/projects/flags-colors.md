---
templateKey: work-item
title: Flags colors
date: 2024-09-02T20:13:00.000Z
image: /assets/flags_app.png
description: Application showing which colours appear on flags and in what percentage
url: https://icelandico.github.io/flag-colors-front/
repoUrl: https://github.com/icelandico/flag-colors-front
type: code
---
I'm interested in vexillology (study of the history, symbolism and usage of flags). I was curious to know what colours each flag is made up of and what percentage of the total flag a particular colour occupies.

First, I downloaded flags in *png* format for each country ([from this site](https://flagpedia.net/download)) and put them in one folder. Next I wrote a python script that loops over this folder and calculated color statistics for each of them. Results are saved in the JSON file.
W﻿hen I got results and compared them with the reality, I could create a web application to present the results.

I﻿ decided to use Svelte with Vite. It was my first time using these two technologies. I liked Svelte but won't choose it over React. Vite, on the other hand, has performed well in comparison to Webpack. Good bye, Webpack!

S﻿tack used for this project:
- Python
  - PIL
  - extcolors
- Svelte
- Vite
- PicoCss
