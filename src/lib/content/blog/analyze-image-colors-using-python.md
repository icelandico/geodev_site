---
templateKey: blog-post
title: Analyze image colors using Python
slug: Analyze image colors using Python
date: 2023-03-26T17:15:55.042Z
description: Analyzing flag colors using Python. Learn how to extract dominant
  colors from images with Pillow and extcolors to build a simple dataset.
category: Python
tag:
  - python
  - various
---

Recently, I got an idea to analyze a specific type of graphic. **Flags**. I wanted to create a simple dataset of what colors the flags are made up of and in what proportions (colors) they occur. It sounds like a data science task, so I did it using Python.

I wrote a program where you specify a directory, and it gives you a JSON with information about each image file found in this directory. In this post, I will focus only on the image analysis itself.

To do it I needed two libraries:

- <a href="https://pypi.org/project/extcolors/">extcolors</a>
- <a href="https://pypi.org/project/Pillow/">Pillow</a>

First, I had to get the images from the directory.

```python
import os

directory = "{your_directory_with_images}"

for dirpath, _, filenames in os.walk(directory):
    filenames_to_process = len(filenames)
    for f in filenames:
        img_path = os.path.abspath(os.path.join(dirpath, f))
        filename = os.path.basename(f)
        colors = self.get_colors(img_path)
        file_dict = self.create_image_entry(colors, filename)
        collection.append(file_dict)
    return collection
```

All the magic happens in the `get_colors` function.

```python
def get_colors(img_path):
    img = Image.open(img_path).convert("RGBA")
    return extcolors.extract_from_image(img, tolerance=33, limit=10)
```

We need to preprocess the image to a format that is supported by the `extcolors` library. Every file in the directory needs to be converted using the `open` method from the `Image` class (PIL library). Then the file will be processed using the `extract_from_image` function from the `extcolors` library. Here we pass three arguments: image file, tolerance, and limit. First one is mandatory, next two are optional. `tolerance` is used to group colors and give you a better visual representation. Even If you use a high quality image with a large resolution, there might a small artifacts that can mess up the results. I experimented a bit with this, and the 33 worked the best in my scenario. I also limited the extracted colors to 10. I didn't want to calculate colors that had a tiny representation in the image.

Here's the example result of one of the processed images:

```json
([((255, 255, 255), 2427354), ((0, 53, 128), 1576486)], 4003840)
```

The result consists of two elements: array of tuples with colors and number of pixels, sum of pixels of which the image is composed. In the example above, we can see that the image has two colors and consists of 4003840 pixels.

My next step was to prepare a JSON with results.

```python
def create_image_entry(colors, file_name):
    total_pixels = colors[1]
    image_dict = {'file_name': file_name}
    image_colors = [{'colorCode': str(index), 'percent': round(color / total_pixels * 100)} for index, color in
                    colors[0] if round(color / total_pixels * 100) >= 1]
    image_dict['img_colors'] = image_colors

    return image_dict
```

For each image, I create a dictionary with two keys: `file_name` and `img_colors`.

The latter is an array of objects, and each of them has a color code in RGB format and a calculated percent value. This indicator shows how much of the image a color occupies. Below is the result JSON with all the information I wanted. In this case, the analysis concerns the Finland flag.

```json
[
	{
		"file_name": "fi.png",
		"img_colors": [
			{ "colorCode": "(255, 255, 255)", "percent": 61 },
			{ "colorCode": "(0, 53, 128)", "percent": 39 }
		]
	}
]
```

Now it was easy to download all country flags, put them in one directory, and run the script for each of them. I made a <a href="https://www.geodev.me/work/flags-colors/">website</a> with a visualization of my results.
