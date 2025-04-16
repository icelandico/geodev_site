---
category: Python
date: 2021-09-14 18:42:45.247000+00:00
description: Learn how to rename files in order using Bash and Python. Solve the problem
  of random file names with a simple script. Create a directory with mock files and
  rename them sequentially. Perfect for organizing your image folders!
slug: Renaming file names with Python
tag:
- basics
- python
templateKey: blog-post
title: Renaming file names with Python
---

A few days ago I faced a problem in one of my folders with images. They had a name with a date and some random digits. What I needed was to name the files according to their order, for example, 'File_nr_1', 'File_nr_2', and so on.

In this short post, I would like to show how I solved this (very easy) task.

First, let's create a directory with a mockup file. This example directory will consist of empty text files with randomly generated names. I used Bash script to do so.

```bash
#!/bin/bash
count=50

for i in $(seq -w 1 $count)
do
    touch "Doc-"$RANDOM.txt
done
```

Simple enough. Now we have 50 files in our `./example` directory. These files have names like 'Doc-15189.txt'.
In Python, if we want to work with files, directories, etc., we can use a built-in `os` module. We are going to get the directory name, take all files inside as a list, and loop through them to manipulate them.

```python
import os

entries = os.listdir('./example')

for index, name in enumerate(entries):
    current_name = name
    new_name = f"File_nr_{index}"
    if name.endswith('.txt'): # I want to manipulate only files with this extension
        os.rename(current_name, new_name)
```

This should work, but after running this script we will notice, that our files were __removed__ from its directory and __moved__ one folder up. That's because we used an absolute path for source files, but a relative path for the destination of the files.

Here's the fixed and working version:
```python
import os

entries = os.listdir('./example')

for index, name in enumerate(entries):
    current_name = name
    _, ext = os.path.splitext(current_name)
    if name.endswith('.txt'):
        os.rename(os.path.join(file_path, current_name), os.path.join(file_path, str(index) + ext))
```

This line `_, ext = os.path.splitext(current_name)` might be a little confusing. The `splitext` method returns two values. In this case, we want only the second value to be assigned and meaningful for us. So the underscore sign is just a way to assign a value that we want to use later.

This simple scripts can be found in this <a href="https://github.com/icelandico/python_Scripts/tree/master/directory_namer">repository</a>.