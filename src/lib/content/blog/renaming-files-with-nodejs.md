---
category: Node
date: 2021-10-28 18:29:21.850000+00:00
description: Learn how to rename multiple files in a directory using JavaScript (Node.js).
  This post builds on the previous Python tutorial, demonstrating the same task with
  a different programming language. Perfect for handling bulk file renaming efficiently.
slug: Renaming files with Nodejs
tag:
- javascript
- node
templateKey: blog-post
title: Renaming files with Node.js
---

In my last post, I presented how to change the names of files in a directory using Python. That's very useful if we have a lot of files and we want to rename every single one. Now I would like to show how to achieve the same goal using a different programming language. This time it's JavaScript (Node JS).



## Generating files

First, let's create a directory with files to work with. It will imitate the situation where we have a lot of files to modify. Basically, I need to use the `fs` (filesystem) built-in module which should be available in any Node version. In this example, my version of node is 14.18.

#### `generateFiles.js`
```javascript
const fs = require('fs');
const folderPath = './filename_changer';
const filesNum = 100;

for (let i = 0; i < filesNum; i++) {
  fs.writeFile(`${folderPath}/${Math.random().toString(36).substr(2, 10)}.txt`, `This is file number ${i}`, (err) => {
    if (err) throw err;
    console.log('File created', i)
  })
}
```

That's it. This will generate 100 `.txt` files in a given directory. Files will have a name with random letters and digits sequence.
To run this script you have to save it in one directory up to a folder you would like to modify and then run it through a terminal using the command `node generateFiles.js`. For the purpose of this exercise, I put all my files in a `filename_changer` directory. Of course, you can run this script from any other place, you just have to modify the `folderPath` variable and adjust to your folder structure.

## Renaming files

This operation requires creating an array with all files from a directory. Then we have to loop through it and rename each of the files, giving them the desired name.

#### `renameFiles.js`
```javascript
const fs = require('fs');
const folderPath = './filename_changer';

files.forEach((file, idx) => {
  fs.rename(`${folderPath}/${file}`, `${folderPath}/new_file_${idx}.txt`, function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });
})
```